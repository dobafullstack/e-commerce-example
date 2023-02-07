import { ApiHideProperty } from '@nestjs/swagger';
import { MethodPayment } from 'app/method/entities/method-payment.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IEntity } from 'types/IEntity';

@Entity({ name: 'orders_payment' })
export class OrderPayment extends IEntity {
	@Column()
	@ApiHideProperty()
	method_payment_id!: number

	@ManyToOne(() => MethodPayment, method => method.order_payment)
	@JoinColumn({ name: 'method_payment_id' })
	method!: MethodPayment;

	@Column()
	amount!: number;

	@Column({ default: false })
	status!: boolean;
}
