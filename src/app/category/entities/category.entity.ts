import { Column, Entity, OneToMany } from 'typeorm';
import { IEntity } from '../../../types/IEntity';
import { CategorySub } from './category-sub.entity';

@Entity({ name: 'categories' })
export class Category extends IEntity {
	@Column()
	name!: string;

	@Column({ nullable: true })
	thumbnail?: string;

	@OneToMany(() => CategorySub, (sub) => sub.category)
	subs!: CategorySub[];
}
