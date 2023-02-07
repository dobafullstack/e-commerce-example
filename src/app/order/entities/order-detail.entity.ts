import { ApiHideProperty } from '@nestjs/swagger';
import { Product } from 'app/product/entities/product.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { IEntity } from 'types/IEntity';
import { Order } from './order.entity';

@Entity({ name: 'orders_detail' })
export class OrderDetail extends IEntity {
	@Column()
	@Exclude()
	@ApiHideProperty()
	order_id!: number;

	@ManyToOne(() => Order, (order) => order.orders_detail)
	@JoinColumn({ name: 'order_id' })
	@ApiHideProperty()
	order!: Order;

	@Column()
	@Exclude()
	@ApiHideProperty()
	product_id!: number;

	@ManyToOne(() => Product, product => product.order_detail)
	@JoinColumn({ name: 'product_id' })
	product!: Product;

	@Column()
	price!: number;

	@Column()
	quantity!: number;

	@Column()
	option_name!: string;
}
