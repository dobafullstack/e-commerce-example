import { FunctionHelper } from 'helpers/function.helper';
import { CategorySubService } from './category-sub.service';
import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { FindOptionsWhere } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CategorySub } from '../entities/category-sub.entity';
import { GetListCategoryQueryDto } from '../dto/get-list-category-query.dto';
import dataSource from '../../../../ormconfig';
import { CreateCategorySubDto } from '../dto/create-category-sub.dto';

@Injectable()
export class CategoryService {
	constructor(private readonly categorySubService: CategorySubService) {}

	async create(input: CreateCategoryDto) {
		let subs: CategorySub[] = [];
		let newCategory: Category;
		const { name, thumbnail } = input;

		await this.findOne({ name }, true);

		await dataSource.transaction(async (manager) => {
			newCategory = await manager.save(Category.create({ name, thumbnail }));

			if (input.subs) {
				subs = await this.categorySubService.createMany(
					newCategory.id,
					input.subs,
					manager
				);
			}
		});

		return {
			//@ts-ignore
			...newCategory,
			subs
		};
	}

	findAll(
		where?:
			| FindOptionsWhere<Category>
			| FindOptionsWhere<Category>[]
			| undefined,
		query?: GetListCategoryQueryDto
	) {
		let relations;
		const take = !query?.limit ? 10 : +query?.limit!;
		const skip = !query?.page ? 0 : take * (+query?.page! - 1);

		if (query) {
			if (query.relation) {
				relations = [query.relation];
			}
		}

		return Category.findAndCount({ where, relations, take, skip });
	}

	async findOne(
		where?:
			| FindOptionsWhere<Category>
			| FindOptionsWhere<Category>[]
			| undefined,
		unique: boolean = false
	) {
		const category = await Category.findOne({ where, relations: ['subs'] });

		if (unique && category) {
			throw new ConflictException([
				{
					field: 'category',
					message: 'Category already exist'
				}
			]);
		}

		return category;
	}

	async findOneOrFail(
		where?:
			| FindOptionsWhere<Category>
			| FindOptionsWhere<Category>[]
			| undefined
	) {
		try {
			const category = await Category.findOneOrFail({
				where,
				relations: ['subs']
			});

			return category;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'category',
					message: 'Category not be found'
				}
			]);
		}
	}

	async update(id: number, input: UpdateCategoryDto) {
		const { name, thumbnail, subs } = input;

		const category = await this.findOneOrFail({ id });

		await this.findOne({ name }, true);

		await dataSource.transaction(async (manager) => {
			if (subs) {
				const remove: CategorySub[] = [];
				const insert: CreateCategorySubDto[] = [];
				const current = category.subs.map((item) => item.name);
				const incoming = subs.map((item) => item.name);

				current.forEach((item, i) => {
					if (!incoming.includes(item)) remove.push(category.subs[i]);
				});

				incoming.forEach((item, i) => {
					if (!current.includes(item)) insert.push(subs[i]);
				});
				
				await this.categorySubService.remove(remove, manager);

				await this.categorySubService.createMany(category.id, insert, manager);
			}

			await manager.update(Category, { id: category.id }, { name, thumbnail });
		});

		return this.findOneOrFail({ id });
	}

	async removeById(id: number) {
		const category = await this.findOneOrFail({ id });

		await this.categorySubService.remove(category.subs);

		return Category.softRemove(category);
	}

	async remove(...categories: Category[]) {
		return Category.softRemove(categories);
	}
}
