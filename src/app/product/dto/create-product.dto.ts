import { IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ValidateNested } from 'validations/is-non-primitive-array.validation';
import { IsNumberArray } from 'validations/is-number-array.validation';
import { CreateProductImageDto } from './create-product-image.dto';
import { CreateProductStockDto } from './create-product-stock.dto';

export class CreateProductDto {
	@IsString()
	name!: string;

	@IsString()
	sku!: string;

	@IsNumber()
	price!: number;

	@IsOptional()
	@ValidateIf((_, value) => value !== undefined)
	@IsString()
	description?: string;

	@IsString()
	thumbnail!: string;

	@ValidateNested(CreateProductImageDto)
	images!: CreateProductImageDto[];

	@ValidateNested(CreateProductStockDto)
	stocks!: CreateProductStockDto[];

	@IsNumberArray()
	categories!: number[];
}
