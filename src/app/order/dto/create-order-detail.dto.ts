import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDetailDto {
	@IsNumber()
	order_id!: number;

	@IsNumber()
	product_id!: number;

	@IsNumber()
	price!: number;

	@IsNumber()
	quantity!: number;

	@IsString()
	option_name!: string;
}
