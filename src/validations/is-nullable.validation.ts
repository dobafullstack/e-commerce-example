import { applyDecorators } from '@nestjs/common';
import { IsOptional, ValidateIf } from 'class-validator';

export const IsNullable = () =>
	applyDecorators(
		IsOptional(),
		ValidateIf((_, value) => value !== undefined)
	);
