import {
	IsEmail,
	IsNumberString, IsString
} from 'class-validator';
import { IsNullable } from 'validations/is-nullable.validation';

export class RegisterDto {
	@IsString()
	username!: string;

	@IsEmail()
	email!: string;

	@IsString()
	password!: string;

	@IsNullable()
	@IsString()
	name?: string;

	@IsNullable()
	@IsNumberString()
	phone?: string;
}
