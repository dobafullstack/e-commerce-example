import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
	@IsString()
	@ApiProperty({ example: 'username' })
	username!: string;

	@IsString()
	@ApiProperty({ example: 'password' })
	password!: string;
}