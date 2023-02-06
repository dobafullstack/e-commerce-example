import { EntityManager, FindOptionsWhere } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductImageDto } from '../dto/create-product-image.dto';
import { ProductImage } from '../entities/product-image.entity';
import { UpdateProductImageDto } from '../dto/update-product-image.dto';

@Injectable()
export class ProductImageService {
	create(
		product_id: number,
		input: CreateProductImageDto,
		manager?: EntityManager
	) {
		if (manager) {
			return manager.save(
				ProductImage.create({
					product_id,
					...input
				})
			);
		}

		return ProductImage.create({
			product_id,
			...input
		}).save();
	}

	async findOneOrFail(
		where?:
			| FindOptionsWhere<ProductImage>
			| FindOptionsWhere<ProductImage>[]
			| undefined
	) {
		try {
			const product_image = await ProductImage.findOneOrFail({ where });

			return product_image;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'product_image',
					message: 'Product image not be found'
				}
			]);
		}
	}

	async update(id: number, input: UpdateProductImageDto) {
		await this.findOneOrFail({ id });

		await ProductImage.update({ id }, { ...input });

		return this.findOneOrFail({ id });
	}

	async remove(id: number) {
		const product_image = await this.findOneOrFail({ id });

		return ProductImage.softRemove(product_image);
	}
}
