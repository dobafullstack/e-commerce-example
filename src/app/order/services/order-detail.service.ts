import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { CreateOrderDetailDto } from '../dto/create-order-detail.dto';
import { OrderDetail } from '../entities/order-detail.entity';

@Injectable()
export class OrderDetailService {
	create(input: CreateOrderDetailDto, manager?: EntityManager) {
		if (manager) {
			return manager.save(OrderDetail.create({ ...input }));
		}

		return OrderDetail.create({ ...input }).save();
	}

	async findOneOrFail(
		where?:
			| FindOptionsWhere<OrderDetail>
			| FindOptionsWhere<OrderDetail>[]
			| undefined
	) {
		try {
			const order_payment = await OrderDetail.findOneOrFail({ where });

			return order_payment;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'order_detail',
					message: 'Order detail not be found'
				}
			]);
		}
	}

	async find(
		where?:
			| FindOptionsWhere<OrderDetail>
			| FindOptionsWhere<OrderDetail>[]
			| undefined
	) {
		return OrderDetail.find({ where });
	}

	async removeByOrderId(order_id: number) {
		const orders_detail = await this.find({ order_id });

		return OrderDetail.softRemove(orders_detail);
	}
}
