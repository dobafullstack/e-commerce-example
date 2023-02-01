import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateProductStockDto } from '../dto/create-product-stock.dto';
import { ProductStock } from '../entities/product-stock.entity';

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
}
