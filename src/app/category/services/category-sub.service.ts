import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { EntityManager, FindOptionsWhere } from 'typeorm';
import { CreateCategorySubDto } from '../dto/create-category-sub.dto';
import { CategorySub } from '../entities/category-sub.entity';

@Injectable()
export class CategorySubService {
	async create(
		category_id: number,
		input: CreateCategorySubDto,
		manager?: EntityManager
	) {
		const { name } = input;

		if (manager) {
			await this.findOne({ name }, true, manager);

			return manager.save(
				CategorySub.create({
					category_id,
					...input
				})
			);
		} else {
			await this.findOne({ name }, true);

			return CategorySub.create({
				category_id,
				...input
			}).save();
		}
	}

	async createMany(
		category_id: number,
		input: CreateCategorySubDto[],
		manager: EntityManager
	) {
		const subs: CategorySub[] = [];

		for (let i = 0; i < input.length; i++) {
			const element = input[i];
			const category_sub = await this.create(category_id, element, manager);

			subs.push(category_sub);
		}

		return subs;
	}

	find(
		where?:
			| FindOptionsWhere<CategorySub>
			| FindOptionsWhere<CategorySub>[]
			| undefined
	) {
		return CategorySub.find({ where });
	}

	async findOne(
		where?:
			| FindOptionsWhere<CategorySub>
			| FindOptionsWhere<CategorySub>[]
			| undefined,
		unique: boolean = false,
		manager?: EntityManager
	) {
		let category_sub;

		if (manager) {
			category_sub = await manager.findOne(CategorySub, { where });
		} else {
			category_sub = await CategorySub.findOne({ where });
		}

		if (unique && category_sub) {
			throw new ConflictException([
				{
					field: 'category_sub',
					message: 'CategorySub already exist'
				}
			]);
		}

		return category_sub;
	}

	async findOneOrFail(
		where?:
			| FindOptionsWhere<CategorySub>
			| FindOptionsWhere<CategorySub>[]
			| undefined,
		manager?: EntityManager
	) {
		try {
			let category;

			if (manager) {
				category = await manager.findOneOrFail(CategorySub, {
					where
				});
			} else {
				category = await CategorySub.findOneOrFail({
					where
				});
			}

			return category;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'category_sub',
					message: 'CategorySub not be found'
				}
			]);
		}
	}

	remove(subs: CategorySub[], manager?: EntityManager) {
		if (manager) {
			return manager.softRemove(subs);
		}

		return CategorySub.softRemove(subs);
	}
}
