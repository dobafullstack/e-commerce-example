import { UserService } from '../src/app/auth/services/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { applyGlobalMiddleware } from 'middlewares/app.middleware';
import { FunctionHelper } from 'helpers/function.helper';

describe('AuthController (e2e)', () => {
	let app: INestApplication;
	const userService = new UserService();

	let username;
	let email;
	let password;

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();

		applyGlobalMiddleware(app);

		await app.init();
	});

	beforeEach(async () => {
		username = FunctionHelper.generateString(6);
		email = FunctionHelper.generateString(6) + '@gmail.com';
		password = FunctionHelper.generateString(6);

		const existingUser = await userService.find({
			username
		});
		await userService.remove(...existingUser);
	});

	describe('/api/auth/register (POST)', () => {
		describe('[VALIDATION]', () => {
			describe('username', () => {
				it('should throw bad request exception when username is null', () => {
					return request(app.getHttpServer())
						.post('/api/auth/register')
						.send({
							email,
							password
						})
						.expect(400);
				});

				it('should throw bad request exception when username is not string', () => {
					return request(app.getHttpServer())
						.post('/api/auth/register')
						.send({
							username: 123123132,
							email,
							password
						})
						.expect(400);
				});
			});

			describe('password', () => {
				it('should throw bad request exception when password is null', () => {
					return request(app.getHttpServer())
						.post('/api/auth/register')
						.send({
							username,
							email
						})
						.expect(400);
				});

				it('should throw bad request exception when password is not string', () => {
					return request(app.getHttpServer())
						.post('/api/auth/register')
						.send({
							username,
							email,
							password: 123213123123
						})
						.expect(400);
				});
			});

			describe('email', () => {
				it('should throw bad request exception when email is null', () => {
					return request(app.getHttpServer())
						.post('/api/auth/register')
						.send({
							username,
							password
						})
						.expect(400);
				});

				it('should throw bad request exception when email is invalid', () => {
					return request(app.getHttpServer())
						.post('/api/auth/register')
						.send({
							username,
							password,
							email: 'email'
						})
						.expect(400);
				});
			});

			describe('name', () => {
				it('should throw bad request exception when name is not string', () => {
					return request(app.getHttpServer())
						.post('/api/auth/register')
						.send({
							username,
							password,
							email,
							name: 123123123
						})
						.expect(400);
				});
			});

			describe('phone', () => {
				it('should throw bad request exception when phone is not string', () => {
					return request(app.getHttpServer())
						.post('/api/auth/register')
						.send({
							username,
							password,
							email,
							phone: 123132132132
						})
						.expect(400);
				});

				it('should throw bad request exception when phone is invalid', () => {
					return request(app.getHttpServer())
						.post('/api/auth/register')
						.send({
							username,
							password,
							email,
							phone: 'test'
						})
						.expect(400);
				});
			});
		});

		describe('[EXCEPTION]', () => {
			it('should throw conflict exception when user already exists', async () => {
				await userService.create({ username, email, password });

				return request(app.getHttpServer())
					.post('/api/auth/register')
					.send({ username, email, password })
					.expect(409);
			});
		});

		describe('[MAIN]', () => {
			it('should create new user', async () => {
				return request(app.getHttpServer())
					.post('/api/auth/register')
					.send({ username, email, password })
					.expect(201)
					.then((res) => {
						const { data } = res.body;

						expect(data.username).toEqual(username);
						expect(data.email).toEqual(email);
					});
			});
		});
	});

	describe('/api/auth/login (POST)', () => {
		describe('[VALIDATION]', () => {
			describe('username', () => {
				it('should throw bad request exception when username is null', () => {
					return request(app.getHttpServer())
						.post('/api/auth/login')
						.send({
							password
						})
						.expect(400);
				});

				it('should throw bad request exception when username is not string', () => {
					return request(app.getHttpServer())
						.post('/api/auth/login')
						.send({
							username: 123123132,
							password
						})
						.expect(400);
				});
			});

			describe('password', () => {
				it('should throw bad request exception when password is null', () => {
					return request(app.getHttpServer())
						.post('/api/auth/login')
						.send({
							username
						})
						.expect(400);
				});

				it('should throw bad request exception when password is not string', () => {
					return request(app.getHttpServer())
						.post('/api/auth/login')
						.send({
							username,
							password: 123213123123
						})
						.expect(400);
				});
			});
		});

		describe('[EXCEPTION]', () => {
			it('should throw not found exception when user not be found', async () => {
				const users = await userService.find({ username: 'test' });
				await userService.remove(...users);

				return request(app.getHttpServer())
					.post('/api/auth/login')
					.send({ username: 'test', password })
					.expect(404);
			});
		});

		describe('[MAIN]', () => {
			it('should return a new token', async () => {
				await userService.create({ username, email, password });

				return request(app.getHttpServer())
					.post('/api/auth/login')
					.send({ username, password })
					.expect(200)
					.then((res) => {
						const { data } = res.body;

						expect(data.token).toBeDefined();
					});
			});
		});
	});
});
