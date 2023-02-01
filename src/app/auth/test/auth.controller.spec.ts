require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import {
	ConflictException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';

describe('AuthController', () => {
	let controller: AuthController;
	let fakeUserService: UserService;
	let user: User;

	const username = 'test';
	const email = 'test@gmail.com';
	const password = 'test';

	const registerInput: RegisterDto = {
		username,
		email,
		password
	};

	const loginInput: LoginDto = {
		username,
		password
	};

	beforeEach(async () => {
		user = {
			id: 1,
			username,
			email,
			password: await argon2.hash(password)
		} as User;

		fakeUserService = {
			create: () => Promise.resolve(user),
			findOne: () => Promise.resolve(user),
			findOneOrFail: () => Promise.resolve(user),
			find: () => Promise.resolve([]),
			remove: () => Promise.resolve([])
		};

		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				AuthService,
				{
					provide: UserService,
					useValue: fakeUserService
				}
			]
		}).compile();

		controller = module.get<AuthController>(AuthController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('register', () => {
		it('should throw conflict exception when user already exists', async () => {
			fakeUserService.findOne = () => Promise.reject(new ConflictException());

			await expect(controller.register(registerInput)).rejects.toThrow(
				ConflictException
			);
		});
		it('should create new user', async () => {
			const result = await controller.register(registerInput);

			expect(result).toEqual(user);
		});
	});

	describe('login', () => {
		it('should throw not found exception when user not be found', async () => {
			fakeUserService.findOneOrFail = () =>
				Promise.reject(new NotFoundException());

			await expect(controller.login(loginInput)).rejects.toThrow(
				NotFoundException
			);
		});
		it('should throw unauthorized exception when wrong password', async () => {
			await expect(
				controller.login({
					...loginInput,
					password: 'wrong_password'
				})
			).rejects.toThrow(UnauthorizedException);
		});
		it('should return a token', async () => {
			const { token } = await controller.login(loginInput);

			const payload = jwt.verify(token, process.env.SECRET_JWT);

			expect(payload.id).toEqual(user.id);
		});
	});
});
