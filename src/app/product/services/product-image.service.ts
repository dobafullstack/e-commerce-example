import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateProductImageDto } from '../dto/create-product-image.dto';
import { ProductImage } from '../entities/product-image.entity';

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
}
