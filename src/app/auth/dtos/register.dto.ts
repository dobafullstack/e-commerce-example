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
	@ApiProperty({ example: 'username' })
	username!: string;

	@IsEmail()
	@ApiProperty({ example: 'email@gmail.com' })
	email!: string;

	@IsString()
	@ApiProperty({ example: 'password' })
	password!: string;

	@IsOptional()
	@ValidateIf((_, value) => value !== undefined)
	@IsString()
	@ApiPropertyOptional({ example: 'name' })
	name?: string;

	@IsOptional()
	@ValidateIf((_, value) => value !== undefined)
	@IsNumberString()
	@ApiPropertyOptional({ example: 'phone' })
	phone?: string;
}
