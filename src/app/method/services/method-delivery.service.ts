import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { MethodDelivery } from '../entities/method-delivery.entity';

@Injectable()
export class MethodDeliveryService {
	async findOneOrFail(
		where?:
			| FindOptionsWhere<MethodDelivery>
			| FindOptionsWhere<MethodDelivery>[]
			| undefined
	) {
		try {
			const method_delivery = await MethodDelivery.findOneOrFail({ where });

			return method_delivery;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'method_delivery',
					message: 'Method delivery not be found'
				}
			]);
		}
	}
}
