import { ApiHideProperty } from '@nestjs/swagger';
import { MethodDelivery } from '../../method/entities/method-delivery.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IEntity } from '../../../types/IEntity';

@Entity({ name: 'orders_delivery' })
export class OrderDelivery extends IEntity {
	@Column()
	@ApiHideProperty()
	method_delivery_id!: number

	@ManyToOne(() => MethodDelivery, method => method.order_delivery)
	@JoinColumn({ name: 'method_delivery_id' })
	method!: MethodDelivery;

	@Column()
	address!: string;

	@Column()
	ward!: string;

	@Column()
	district!: string;

	@Column()
	city!: string;

	@Column({ default: false })
	status!: boolean;
}
