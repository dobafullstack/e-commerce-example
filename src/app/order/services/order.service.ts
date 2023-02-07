import { OrderDetail } from './../entities/order-detail.entity';
import {
	Injectable,
	MethodNotAllowedException,
	NotFoundException
} from '@nestjs/common';
import { MethodDeliveryService } from 'app/method/services/method-delivery.service';
import { MethodPaymentService } from 'app/method/services/method-payment.service';
import { Product } from 'app/product/entities/product.entity';
import { ProductService } from 'app/product/services/product.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import dataSource from '../../../../ormconfig';
import { Order } from '../entities/order.entity';
import { User } from 'app/auth/entities/user.entity';
import { OrderPayment } from '../entities/order-payment.entity';
import { OrderDelivery } from '../entities/order-delivery.entity';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { ProductStockService } from 'app/product/services/product-stock.service';
import { OrderPaymentService } from './order-payment.service';
import { OrderDeliveryService } from './order-delivery.service';
import { OrderDetailService } from './order-detail.service';
import { OrderStatus } from 'types/Order';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrderService {
	constructor(
		private readonly productService: ProductService,
		private readonly productStockService: ProductStockService,
		private readonly methodPaymentService: MethodPaymentService,
		private readonly methodDeliveryService: MethodDeliveryService,
		private readonly orderPaymentService: OrderPaymentService,
		private readonly orderDeliveryService: OrderDeliveryService,
		private readonly orderDetailService: OrderDetailService
	) {}

	async create(user: User, input: CreateOrderDto) {
		const {
			method_delivery_id,
			method_payment_id,
			address,
			ward,
			district,
			city
		} = input;
		const order_products: any[] = [];
		let amount = 0;

		const method_payment = await this.methodPaymentService.findOneOrFail({
			id: method_payment_id
		});

		const method_delivery = await this.methodDeliveryService.findOneOrFail({
			id: method_delivery_id
		});

		amount += method_delivery.fee;

		for (let i = 0; i < input.order_products.length; i++) {
			const { product_id, quantity, product_stock_id } =
				input.order_products[i];

			const product = await this.productService.findOneOrFail({
				id: product_id
			});
			const { option_name } = await this.productStockService.findOneOrFail({
				id: product_stock_id
			});
			amount += product.price * quantity;
			order_products.push({
				product,
				quantity,
				option_name
			});
		}

		const order: Order = await dataSource.transaction(async (manager) => {
			//Create order payment
			const order_payment = await this.orderPaymentService.create(
				{
					method_payment_id: method_payment.id,
					amount
				},
				manager
			);

			//Create order delivery
			const order_delivery = await this.orderDeliveryService.create(
				{
					method_delivery_id: method_delivery.id,
					address,
					ward,
					district,
					city
				},
				manager
			);

			const new_order = await manager.save(
				Order.create({
					user,
					payment: order_payment,
					delivery: order_delivery
				})
			);

			//Create order detail
			const orders_detail: OrderDetail[] = [];
			for (let i = 0; i < order_products.length; i++) {
				const { product, quantity, option_name } = order_products[i];

				const order_detail = await this.orderDetailService.create(
					{
						order_id: new_order.id,
						product_id: product.id,
						price: product.price,
						quantity,
						option_name
					},
					manager
				);

				orders_detail.push(order_detail);
			}

			return new_order;
		});

		return order;
	}

	async findOneOrFail(
		where?: FindOptionsWhere<Order> | FindOptionsWhere<Order>[] | undefined,
		manager?: EntityManager
	) {
		try {
			let order: Order;

			if (manager) {
				order = await manager.findOneOrFail(Order, {
					where,
					relations: [
						'orders_detail',
						'orders_detail.product',
						'payment',
						'delivery',
						'user'
					]
				});
			} else {
				order = await Order.findOneOrFail({
					where,
					relations: [
						'orders_detail',
						'orders_detail.product',
						'payment',
						'delivery',
						'user'
					]
				});
			}

			return order;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'order',
					message: 'Order not be found'
				}
			]);
		}
	}

	async find(
		where?: FindOptionsWhere<Order> | FindOptionsWhere<Order>[] | undefined
	) {
		return Order.find({
			where,
			relations: ['user', 'payment', 'delivery', 'orders_detail']
		});
	}

	async update(order_id: number, input: UpdateOrderDto) {
		const { status } = input;

		const { order_delivery_id, order_payment_id } = await this.findOneOrFail({
			id: order_id
		});

		if (status === OrderStatus.CANCELED) {
			await this.orderDeliveryService.removeById(order_delivery_id);
			await this.orderPaymentService.removeById(order_payment_id);
			await this.orderDetailService.removeByOrderId(order_id);
		}

		if (status === OrderStatus.SUCCESS) {
			const order_delivery = await this.orderDeliveryService.findOneOrFail({
				id: order_delivery_id
			});

			if (!order_delivery.status) {
				throw new MethodNotAllowedException([
					{
						field: 'order_delivery',
						message: 'Order delivery status was not success'
					}
				]);
			}

			const order_payment = await this.orderPaymentService.findOneOrFail({
				id: order_payment_id
			});

			if (!order_payment.status) {
				throw new MethodNotAllowedException([
					{
						field: 'order_payment',
						message: 'Order payment status was not success'
					}
				]);
			}
		}

		await Order.update({ id: order_id }, { status });

		return this.findOneOrFail({ id: order_id });
	}

	async updateOrderPayment(order_id: number) {
		const order = await this.findOneOrFail({ id: order_id });

		return this.orderPaymentService.update(order.order_payment_id);
	}

	async updateOrderDelivery(order_id: number) {
		const order = await this.findOneOrFail({ id: order_id });

		return this.orderDeliveryService.update(order.order_delivery_id);
	}
}
