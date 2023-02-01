import { IsString } from 'class-validator';
import { ValidateNested } from 'validations/is-non-primitive-array.validation';
import { IsNullable } from 'validations/is-nullable.validation';
import { CreateCategorySubDto } from './create-category-sub.dto';

export class CreateCategoryDto {
	@IsString()
	name!: string;

	@IsNullable()
	@IsString()
	thumbnail?: string;

	@IsNullable()
	@ValidateNested(CreateCategorySubDto)
	subs?: CreateCategorySubDto[];
}
