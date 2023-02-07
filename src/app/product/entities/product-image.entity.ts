import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IEntity } from '../../../types/IEntity';
import { Product } from './product.entity';

@Entity({ name: 'products_image' })
export class ProductImage extends IEntity {
	@Column()
	url!: string;

	@Column()
	@Exclude()
	product_id!: number;

	@ManyToOne(() => Product, (product) => product.images)
	@JoinColumn({ name: 'product_id' })
	product!: Product;
}
