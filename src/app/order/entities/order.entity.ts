import { ApiHideProperty } from '@nestjs/swagger';
import { User } from '../../auth/entities/user.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { IEntity } from '../../../types/IEntity';
import { OrderStatus } from '../../../types/Order';
import { OrderDelivery } from './order-delivery.entity';
import { OrderDetail } from './order-detail.entity';
import { OrderPayment } from './order-payment.entity';

@Entity({ name: 'orders' })
export class Order extends IEntity {
	@OneToMany(() => OrderDetail, (order_detail) => order_detail.order)
	orders_detail!: OrderDetail[];

	@Column()
	@Exclude()
	@ApiHideProperty()
	order_payment_id!: number;

	@OneToOne(() => OrderPayment)
	@JoinColumn({ name: 'order_payment_id' })
	payment!: OrderPayment;

	@Column()
	@Exclude()
	@ApiHideProperty()
	order_delivery_id!: number;

	@OneToOne(() => OrderDelivery)
	@JoinColumn({ name: 'order_delivery_id' })
	delivery!: OrderDelivery;

	@Column()
	@Exclude()
	@ApiHideProperty()
	user_id!: number;

	@ManyToOne(() => User, user => user.orders)
	@JoinColumn({ name: 'user_id' })
	user!: User;

	@Column({ default: OrderStatus.PENDING })
	status!: OrderStatus;
}
