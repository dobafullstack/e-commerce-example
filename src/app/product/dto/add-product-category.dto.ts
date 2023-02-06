import { IsNumber } from 'class-validator';

export class ProductCategoryDto {
	@IsNumber()
	product_id!: number;

	@IsNumber()
	category_id!: number;
}
