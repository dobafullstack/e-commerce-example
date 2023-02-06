import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { IEntity } from 'types/IEntity';
import { Category } from './category.entity';

@Entity({ name: 'categories_sub' })
export class CategorySub extends IEntity {
	@Column()
	name!: string;

	@Column({ nullable: true })
	thumbnail?: string;

	@Column()
	@Exclude()
	@ApiHideProperty()
	category_id!: number;

	@ManyToOne(() => Category, (cate) => cate.subs)
	@JoinColumn({ name: 'category_id' })
	@ApiHideProperty()
	category!: Category;
}
