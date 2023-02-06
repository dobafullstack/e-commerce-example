import { OrderDetail } from './../entities/order-detail.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
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

@Injectable()
export class OrderService {
	constructor(
		private readonly productService: ProductService,
		private readonly productStockService: ProductStockService,
		private readonly methodPaymentService: MethodPaymentService,
		private readonly methodDeliveryService: MethodDeliveryService
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

		const order = await dataSource.transaction(async (manager) => {
			//Create order payment
			const order_payment = await manager.save(
				OrderPayment.create({
					method_payment_id: method_payment.id,
					amount
				})
			);

			//Create order delivery
			const order_delivery = await manager.save(
				OrderDelivery.create({
					method_delivery_id: method_delivery.id,
					address,
					ward,
					district,
					city
				})
			);

			const order = await manager.save(
				Order.create({
					user_id: user.id,
					order_payment_id: order_payment.id,
					order_delivery_id: order_delivery.id
				})
			);

			//Create order detail
			for (let i = 0; i < order_products.length; i++) {
				const { product, quantity, option_name } = order_products[i];

				await manager.save(
					OrderDetail.create({
						order_id: order.id,
						product_id: product.id,
						price: product.price,
						quantity,
						option_name
					})
				);
			}

			return order;
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
					relations: ['orders_detail', 'payment', 'delivery', 'user']
				});
			} else {
				order = await Order.findOneOrFail({
					where,
					relations: ['orders_detail', 'payment', 'delivery', 'user']
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
}
