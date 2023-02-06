import { OrderDelivery } from 'app/order/entities/order-delivery.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IEntity } from 'types/IEntity';

@Entity({ name: 'methods_delivery' })
export class MethodDelivery extends IEntity {
	@Column()
	name!: string;

	@Column()
	fee!: number;

	@OneToMany(() => OrderDelivery, order_delivery => order_delivery.method)
	order_delivery!: OrderDelivery[]
}
