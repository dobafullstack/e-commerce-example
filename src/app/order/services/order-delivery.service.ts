import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Injectable, MethodNotAllowedException, NotFoundException } from '@nestjs/common';
import { CreateOrderDeliveryDto } from '../dto/create-order-delivery.dto';
import { OrderDelivery } from '../entities/order-delivery.entity';

@Injectable()
export class OrderDeliveryService {
	create(input: CreateOrderDeliveryDto, manager?: EntityManager) {
		if (manager) {
			return manager.save(OrderDelivery.create({ ...input }));
		}

		return OrderDelivery.create({ ...input }).save();
	}

	async findOneOrFail(
		where?:
			| FindOptionsWhere<OrderDelivery>
			| FindOptionsWhere<OrderDelivery>[]
			| undefined
	) {
		try {
			const order_payment = await OrderDelivery.findOneOrFail({ where });

			return order_payment;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'order_delivery',
					message: 'Order delivery not be found'
				}
			]);
		}
	}

	async removeById(id: number){
		const order_delivery = await this.findOneOrFail({ id });

		return OrderDelivery.softRemove(order_delivery)
	}

	async update(id: number) {
		const order_delivery = await this.findOneOrFail({ id });

		if (order_delivery.status) {
			throw new MethodNotAllowedException([
				{
					field: 'order_delivery',
					message: 'Order delivery status already success'
				}
			]);
		}

		await OrderDelivery.update(
			{ id },
			{
				status: true
			}
		);

		return this.findOneOrFail({ id });
	}
}
