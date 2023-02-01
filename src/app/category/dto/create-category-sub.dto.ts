import {
    IsOptional,
    IsString,
    ValidateIf
} from 'class-validator';

export class CreateCategorySubDto {
	@IsString()
	name!: string;

	@IsOptional()
	@ValidateIf((_, value) => value !== undefined)
	@IsString()
	thumbnail?: string;
}
