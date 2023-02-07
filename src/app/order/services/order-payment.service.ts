import {
	Injectable,
	NotFoundException,
	MethodNotAllowedException
} from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { CreateOrderPaymentDto } from '../dto/create-order-payment.dto';
import { OrderPayment } from '../entities/order-payment.entity';

@Injectable()
export class OrderPaymentService {
	create(input: CreateOrderPaymentDto, manager?: EntityManager) {
		if (manager) {
			return manager.save(OrderPayment.create({ ...input }));
		}

		return OrderPayment.create({ ...input }).save();
	}

	async findOneOrFail(
		where?:
			| FindOptionsWhere<OrderPayment>
			| FindOptionsWhere<OrderPayment>[]
			| undefined
	) {
		try {
			const order_payment = await OrderPayment.findOneOrFail({ where });

			return order_payment;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'order_payment',
					message: 'Order payment not be found'
				}
			]);
		}
	}

	async removeById(id: number) {
		const order_payment = await this.findOneOrFail({ id });

		return OrderPayment.softRemove(order_payment);
	}

	async update(id: number) {
		const order_payment = await this.findOneOrFail({ id });

		if (order_payment.status) {
			throw new MethodNotAllowedException([
				{
					field: 'order_payment',
					message: 'Order payment status already success'
				}
			]);
		}

		await OrderPayment.update(
			{ id },
			{
				status: true
			}
		);

		return this.findOneOrFail({ id });
	}
}
