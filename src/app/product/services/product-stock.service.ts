import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductStockDto } from '../dto/create-product-stock.dto';
import { ProductStock } from '../entities/product-stock.entity';
import { UpdateProductStockDto } from '../dto/update-product-stock.dto';

@Injectable()
export class ProductStockService {
	create(
		product_id: number,
		input: CreateProductStockDto,
		manager?: EntityManager
	) {
		if (manager) {
			return manager.save(
				ProductStock.create({
					product_id,
					...input
				})
			);
		}

		return ProductStock.create({
			product_id,
			...input
		}).save();
	}

	async findOneOrFail(
		where?:
			| FindOptionsWhere<ProductStock>
			| FindOptionsWhere<ProductStock>[]
			| undefined
	) {
		try {
			const product_image = await ProductStock.findOneOrFail({ where });

			return product_image;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'product_stock',
					message: 'Product stock not be found'
				}
			]);
		}
	}

	async update(id: number, input: UpdateProductStockDto) {
		await this.findOneOrFail({ id });

		await ProductStock.update({ id }, { ...input });

		return this.findOneOrFail({ id });
	}

	async remove(id: number) {
		const product_stock = await this.findOneOrFail({ id });

		return ProductStock.softRemove(product_stock);
	}
}
