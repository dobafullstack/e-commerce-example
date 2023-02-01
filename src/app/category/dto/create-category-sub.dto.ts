import {
	IsString
} from 'class-validator';
import { IsNullable } from 'validations/is-nullable.validation';

export class CreateCategorySubDto {
	@IsString()
	name!: string;

	@IsNullable()
	@IsString()
	thumbnail?: string;
}
