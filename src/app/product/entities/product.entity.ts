import { ApiProperty } from '@nestjs/swagger';
import { CategorySub } from '../../category/entities/category-sub.entity';
import { OrderDetail } from '../../order/entities/order-detail.entity';
import { Transform } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { IEntity } from '../../../types/IEntity';
import { ProductImage } from './product-image.entity';
import { ProductStock } from './product-stock.entity';

@Entity({ name: 'products' })
export class Product extends IEntity {
	@Column()
	name!: string;

	@Column()
	sku!: string;

	@Column()
	price!: number;

	@Column({ nullable: true })
	description?: string;

	@Column()
	thumbnail!: string;

	@OneToMany(() => ProductImage, (image) => image.product)
	@Transform(({ value }) => value.map((item) => item.url))
	@ApiProperty({ example: ['string'] })
	images!: ProductImage[];

	@OneToMany(() => ProductStock, (stock) => stock.product)
	stocks!: ProductStock[];

	@ManyToMany(() => CategorySub)
	@JoinTable({
		name: 'products_categories',
		joinColumn: {
			name: 'product_id'
		},
		inverseJoinColumn: {
			name: 'category_id'
		}
	})
	categories!: CategorySub[];

	@OneToMany(() => OrderDetail, order_detail => order_detail.product)
	order_detail!: OrderDetail
}
