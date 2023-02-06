import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { CategorySubService } from 'app/category/services/category-sub.service';
import { FindOptionsWhere } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';
import { ProductImageService } from './product-image.service';
import { ProductStockService } from './product-stock.service';
import dataSource from '../../../../ormconfig';
import { ProductImage } from '../entities/product-image.entity';
import { ProductStock } from '../entities/product-stock.entity';
import { CategorySub } from 'app/category/entities/category-sub.entity';
import { GetListProductQueryDto } from '../dto/get-list-product-query.dto';
import { ProductCategoryDto } from '../dto/add-product-category.dto';

@Injectable()
export class ProductService {
	constructor(
		private readonly categorySubService: CategorySubService,
		private readonly productImageService: ProductImageService,
		private readonly productStockService: ProductStockService
	) {}

	async create(input: CreateProductDto) {
		const { name, sku, price, description, thumbnail } = input;

		await this.findOne({ name }, true);

		await dataSource.transaction(async (manager) => {
			const images: ProductImage[] = [];
			const stocks: ProductStock[] = [];
			const categories: CategorySub[] = [];

			const newProduct = await manager.save(
				Product.create({
					name,
					sku,
					price,
					description,
					thumbnail
				})
			);

			for (let i = 0; i < input.images.length; i++) {
				const image = await this.productImageService.create(
					newProduct.id,
					input.images[i],
					manager
				);
				images.push(image);
			}
			for (let i = 0; i < input.stocks.length; i++) {
				const stock = await this.productStockService.create(
					newProduct.id,
					input.stocks[i],
					manager
				);
				stocks.push(stock);
			}
			for (let i = 0; i < input.categories.length; i++) {
				const category_sub = await this.categorySubService.findOneOrFail(
					{
						id: input.categories[i]
					},
					manager
				);
				categories.push(category_sub);
			}

			await manager.save({
				id: newProduct.id,
				images,
				stocks,
				categories
			});
		});

		return this.findOne({ name });
	}

	findAll(
		where?: FindOptionsWhere<Product> | FindOptionsWhere<Product>[],
		query?: GetListProductQueryDto
	) {
		const take = !query?.limit ? 10 : +query?.limit!;
		const skip = !query?.page ? 0 : take * (+query?.page! - 1);

		return Product.findAndCount({
			where,
			take,
			skip,
			relations: ['images', 'stocks', 'categories'],
			order: query?.order_by
				? {
						[query.order_by]:
							query.sort?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC'
				  }
				: undefined
		});
	}

	async findOne(
		where?: FindOptionsWhere<Product> | FindOptionsWhere<Product>[],
		unique: boolean = false
	) {
		const product = await Product.findOne({
			where,
			relations: ['images', 'stocks', 'categories']
		});

		if (unique && product) {
			throw new ConflictException([
				{
					field: 'product',
					message: 'Product already exists'
				}
			]);
		}

		return product;
	}

	async findOneOrFail(
		where?: FindOptionsWhere<Product> | FindOptionsWhere<Product>[]
	) {
		try {
			const product = await Product.findOneOrFail({
				where,
				relations: ['images', 'stocks', 'categories']
			});

			return product;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'product',
					message: 'Product not be found'
				}
			]);
		}
	}

	async update(id: number, input: UpdateProductDto) {
		const { name, sku, price, description, thumbnail } = input;

		await this.findOneOrFail({ id });

		await this.findOne({ name }, true);

		await Product.update({ id }, { name, sku, price, description, thumbnail });

		return this.findOneOrFail({ id });
	}

	async remove(id: number) {
		const product = await this.findOneOrFail({ id });

		return Product.softRemove(product);
	}

	async addCategory(input: ProductCategoryDto) {
		const { product_id, category_id } = input;
		const product = await this.findOneOrFail({ id: product_id });
		const category = await this.categorySubService.findOneOrFail({
			id: category_id
		});

		product.categories = product.categories.concat(category);

		await dataSource.manager.save(product);

		return this.findOneOrFail({ id: product_id });
	}

	async removeCategory(input: ProductCategoryDto) {
		const { product_id, category_id } = input;
		const product = await this.findOneOrFail({ id: product_id });

		product.categories = product.categories.filter(
			(item) => item.id !== category_id
		);

		await dataSource.manager.save(product);

		return this.findOneOrFail({ id: product_id });
	}
}
