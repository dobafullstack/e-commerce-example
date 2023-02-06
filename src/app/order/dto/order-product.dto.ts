import { IsNumber } from 'class-validator';

export class OrderProductDto {
	@IsNumber()
	product_id!: number;

	@IsNumber()
	quantity!: number;
	
	@IsNumber()
	product_stock_id!: number
}
