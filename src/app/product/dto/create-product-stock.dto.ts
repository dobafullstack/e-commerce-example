import { IsNumber, IsString } from 'class-validator';

export class CreateProductStockDto {
	@IsString()
	option_name!: string;

	@IsNumber()
	quantity!: number;
}
