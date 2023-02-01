require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

import {
	ConflictException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '../entities/user.entity';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import * as argon2 from 'argon2';

describe('AuthService', () => {
	let service: AuthService;
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
			providers: [
				AuthService,
				{
					provide: UserService,
					useValue: fakeUserService
				}
			]
		}).compile();

		service = module.get<AuthService>(AuthService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('register', () => {
		it('should throw conflict exception when user already exist', async () => {
			fakeUserService.findOne = () => Promise.reject(new ConflictException());

			await expect(service.register(registerInput)).rejects.toThrow(
				ConflictException
			);
		});

		it('should create a new user', async () => {
			const newUser = await service.register(registerInput);

			expect(newUser).toEqual(user);
		});
	});

	describe('login', () => {
		it('should throw no content exception when user not be found', async () => {
			fakeUserService.findOneOrFail = () =>
				Promise.reject(new NotFoundException([]));

			await expect(service.login(loginInput)).rejects.toThrow(
				NotFoundException
			);
		});

		it('should throw unauthorized exception when wrong password', async () => {
			await expect(
				service.login({ username, password: '123' })
			).rejects.toThrow(UnauthorizedException);
		});

		it('should return a jsonwebtoken', async () => {
			const { token } = await service.login(loginInput);

			expect(token).toBeDefined();
		});
	});
});
