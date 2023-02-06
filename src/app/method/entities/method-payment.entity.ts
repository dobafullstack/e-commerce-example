import { OrderPayment } from 'app/order/entities/order-payment.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IEntity } from 'types/IEntity';

@Entity({ name: 'methods_payment' })
export class MethodPayment extends IEntity {
	@Column()
	name!: string;

	@OneToMany(() => OrderPayment, order_payment => order_payment.method)
	order_payment!: OrderPayment[]
}
