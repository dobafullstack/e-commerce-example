import { ApiHideProperty } from '@nestjs/swagger';
import { OrderPayment } from '../../order/entities/order-payment.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IEntity } from '../../../types/IEntity';

@Entity({ name: 'methods_payment' })
export class MethodPayment extends IEntity {
	@Column()
	name!: string;

	@OneToMany(() => OrderPayment, order_payment => order_payment.method)
	@ApiHideProperty()
	order_payment!: OrderPayment[]
}
