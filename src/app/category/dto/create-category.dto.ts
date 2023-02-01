import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { ValidateNested } from 'validations/is-non-primitive-array.validation';
import { CreateCategorySubDto } from './create-category-sub.dto';

export class CreateCategoryDto {
	@IsString()
	name!: string;

	@IsOptional()
	@ValidateIf((_, value) => value !== undefined)
	@IsString()
	thumbnail?: string;

	@ValidateIf((_, value) => value !== undefined)
	@IsOptional()
	@ValidateNested(CreateCategorySubDto)
	subs?: CreateCategorySubDto[];
}
