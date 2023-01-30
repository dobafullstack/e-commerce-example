import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { UserService } from './user.service';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { SECRET_JWT } from 'configs/env';
import { FunctionHelper } from 'helpers/function.helper';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async register(input: RegisterDto) {
		const { username, email } = input;

		//Make sure user is unique
		await this.userService.findOne([{ username }, { email }], true);

		return this.userService.create(input);
	}

	async login(input: LoginDto) {
		const { username, password } = input;

		//Make sure user already exist
		const user = await this.userService.findOneOrFail({ username });

		const checkPassword = await argon2.verify(user.password, password);

		if (!checkPassword) {
			throw new UnauthorizedException([
				{
					field: 'password',
					message: 'Wrong password'
				}
			]);
		}

		return {
			token: FunctionHelper.generateToken({ id: user.id })
		};
	}
}
