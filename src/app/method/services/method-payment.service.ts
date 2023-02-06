import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { MethodPayment } from '../entities/method-payment.entity';

@Injectable()
export class MethodPaymentService {
	async findOneOrFail(
		where?:
			| FindOptionsWhere<MethodPayment>
			| FindOptionsWhere<MethodPayment>[]
			| undefined
	) {
		try {
			const method_delivery = await MethodPayment.findOneOrFail({ where });

			return method_delivery;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'method_payment',
					message: 'Method payment not be found'
				}
			]);
		}
	}
}
