import { CategorySub } from 'app/category/entities/category-sub.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { IEntity } from 'types/IEntity';
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
}
