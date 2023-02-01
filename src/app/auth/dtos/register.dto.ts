import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsEmail,
	IsNumberString,
	IsOptional,
	IsString,
	ValidateIf
} from 'class-validator';

export class RegisterDto {
	@IsString()
	username!: string;

	@IsEmail()
	email!: string;

	@IsString()
	password!: string;

	@IsOptional()
	@ValidateIf((_, value) => value !== undefined)
	@IsString()
	name?: string;

	@IsOptional()
	@ValidateIf((_, value) => value !== undefined)
	@IsNumberString()
	phone?: string;
}
