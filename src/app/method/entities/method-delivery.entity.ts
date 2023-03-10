import { ApiHideProperty } from '@nestjs/swagger';
import { OrderDelivery } from '../../order/entities/order-delivery.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IEntity } from '../../../types/IEntity';

@Entity({ name: 'methods_delivery' })
export class MethodDelivery extends IEntity {
	@Column()
	name!: string;

	@Column()
	fee!: number;

	@OneToMany(() => OrderDelivery, order_delivery => order_delivery.method)
	@ApiHideProperty()
	order_delivery!: OrderDelivery[]
}
