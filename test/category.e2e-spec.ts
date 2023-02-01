import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategorySubService } from 'app/category/services/category-sub.service';
import { CategoryService } from 'app/category/services/category.service';
import { FunctionHelper } from 'helpers/function.helper';
import { applyGlobalMiddleware } from 'middlewares/app.middleware';
import { tap } from 'rxjs';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CategoryController (e2e)', () => {
	let app: INestApplication;
	let name;
	let thumbnail;
	let subName;
	let subThumbnail;
	const categorySubService = new CategorySubService();
	const categoryService = new CategoryService(categorySubService);

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleFixture.createNestApplication();

		applyGlobalMiddleware(app);

		await app.init();
	});

	beforeEach(async () => {
		name = FunctionHelper.generateString(6);
		thumbnail = FunctionHelper.generateString(20);
		subName = FunctionHelper.generateString(6);
		subThumbnail = FunctionHelper.generateString(20);

		const [categories] = await categoryService.findAll({ name });
		const subs = await categorySubService.find({ name: subName });
		await categoryService.remove(...categories);
		await categorySubService.remove(subs);
	});

	describe('/api/category (POST)', () => {
		describe('[VALIDATION]', () => {
			describe('name', () => {
				it('should throw bad request exception when name is null', () => {
					return request(app.getHttpServer())
						.post('/api/category')
						.expect(400)
						.then((res) => {
							const { errors } = res.body;

							expect(errors[0].field).toEqual('name');
						});
				});

				it('should throw bad request exception when name is not a string', () => {
					return request(app.getHttpServer())
						.post('/api/category')
						.send({ name: 123123 })
						.expect(400)
						.then((res) => {
							const { errors } = res.body;

							expect(errors[0].field).toEqual('name');
						});
				});
			});
			describe('thumbnail', () => {
				it('should throw bad request exception when thumbnail is not a string', () => {
					return request(app.getHttpServer())
						.post('/api/category')
						.send({ thumbnail: 123123, name: 'name' })
						.expect(400)
						.then((res) => {
							const { errors } = res.body;

							expect(errors[0].field).toEqual('thumbnail');
						});
				});
			});
			describe('subs', () => {
				it('should throw bad request exception when sub is not an instance of CreateCategorySubDto', () => {
					return request(app.getHttpServer())
						.post('/api/category')
						.send({ name: 'name', subs: [{}] })
						.expect(400)
						.then((res) => {
							const { errors } = res.body;

							expect(errors[0].field).toEqual('subs');
						});
				});
			});
		});

		describe('[EXCEPTION]', () => {
			it('should throw conflict exception when category already exists', async () => {
				await categoryService.create({ name, thumbnail });

				return request(app.getHttpServer())
					.post('/api/category')
					.send({ name, thumbnail })
					.expect(409);
			});
			it('should throw conflict exception when category sub already exists', async () => {
				const category = await categoryService.create({ name, thumbnail });
				await categorySubService.create(category.id, {
					name: subName,
					thumbnail
				});

				return request(app.getHttpServer())
					.post('/api/category')
					.send({ name, thumbnail, subs: [{ name: subName }] })
					.expect(409);
			});
		});

		describe('[MAIN]', () => {
			it('should create new category', async () => {
				return request(app.getHttpServer())
					.post('/api/category')
					.send({
						name,
						thumbnail,
						subs: [{ name: subName, thumbnail: subThumbnail }]
					})
					.expect(201)
					.then((res) => {
						const { data } = res.body;

						expect(data.name).toEqual(name);
						expect(data.thumbnail).toEqual(thumbnail);

						expect(data.subs[0].name).toEqual(subName);
						expect(data.subs[0].thumbnail).toEqual(subThumbnail);
					});
			});
		});
	});

	describe('/api/category (GET)', () => {
		describe('[MAIN]', () => {
			it('should get a list of category', async () => {
				return request(app.getHttpServer())
					.get('/api/category')
					.expect(200)
					.then((res) => {
						const { data, pagination } = res.body;

						expect(data).toBeDefined();
						expect(pagination).toBeDefined();
					});
			});
		});
	});

	describe('/api/category/:category_id (GET)', () => {
		describe('[EXCEPTION]', () => {
			it('should throw a not found exception when category not be found', async () => {
				const newCategory = await categoryService.create({ name, thumbnail });
				const category_id = newCategory.id;
				await categoryService.removeById(category_id);

				return request(app.getHttpServer())
					.get(`/api/category/${category_id}`)
					.expect(404)
					.then((res) => {
						const { errors } = res.body;

						expect(errors[0].field).toEqual('category');
					});
			});
		});
		describe('[MAIN]', () => {
			it('should get a detail of category', async () => {
				const newCategory = await categoryService.create({ name, thumbnail });
				const category_id = newCategory.id;

				return request(app.getHttpServer())
					.get(`/api/category/${category_id}`)
					.expect(200)
					.then((res) => {
						const { data } = res.body;

						expect(data.name).toEqual(newCategory.name);
						expect(data.thumbnail).toEqual(newCategory.thumbnail);
					});
			});
		});
	});

	describe('/api/category/:category_id (PATCH)', () => {
		describe('[VALIDATION]', () => {
			describe('name', () => {
				it('should throw bad request exception when name is null', () => {
					return request(app.getHttpServer())
						.patch('/api/category/1')
						.expect(400)
						.then((res) => {
							const { errors } = res.body;

							expect(errors[0].field).toEqual('name');
						});
				});

				it('should throw bad request exception when name is not a string', () => {
					return request(app.getHttpServer())
						.patch('/api/category/1')
						.send({ name: 123123 })
						.expect(400)
						.then((res) => {
							const { errors } = res.body;

							expect(errors[0].field).toEqual('name');
						});
				});
			});
			describe('thumbnail', () => {
				it('should throw bad request exception when thumbnail is not a string', () => {
					return request(app.getHttpServer())
						.patch('/api/category/1')
						.send({ thumbnail: 123123, name: 'name' })
						.expect(400)
						.then((res) => {
							const { errors } = res.body;

							expect(errors[0].field).toEqual('thumbnail');
						});
				});
			});
			describe('subs', () => {
				it('should throw bad request exception when sub is not an instance of CreateCategorySubDto', () => {
					return request(app.getHttpServer())
						.patch('/api/category/1')
						.send({ name: 'name', subs: [{}] })
						.expect(400)
						.then((res) => {
							const { errors } = res.body;

							expect(errors[0].field).toEqual('subs');
						});
				});
			});
		});

		describe('[EXCEPTION]', () => {
			it('should throw not found exception when category not be found', async () => {
				const newCategory = await categoryService.create({ name, thumbnail });
				const category_id = newCategory.id;
				await categoryService.removeById(category_id);

				return request(app.getHttpServer())
					.patch(`/api/category/${category_id}`)
					.send({
						name,
						thumbnail,
						subs: [{ name: subName, thumbnail: subThumbnail }]
					})
					.expect(404)
					.then((res) => {
						const { errors } = res.body;

						expect(errors[0].field).toEqual('category');
					});
			});
			it('should throw conflict exception when category already exists', async () => {
				const newCategory = await categoryService.create({ name, thumbnail });
				const category_id = newCategory.id;

				return request(app.getHttpServer())
					.patch(`/api/category/${category_id}`)
					.send({
						name,
						thumbnail,
						subs: [{ name: subName, thumbnail: subThumbnail }]
					})
					.expect(409)
					.then((res) => {
						const { errors } = res.body;

						expect(errors[0].field).toEqual('category');
					});
			});
			it('should throw conflict exception when category sub already exists', async () => {
				const updateCategoryName = FunctionHelper.generateString(6);
				const updateCategorySubName = FunctionHelper.generateString(6);
				const newCategory1 = await categoryService.create({ name, thumbnail });
				const newCategory2 = await categoryService.create({
					name: FunctionHelper.generateString(6),
					thumbnail
				});
				const category_id_1 = newCategory1.id;
				const category_id_2 = newCategory2.id;
				await categorySubService.create(category_id_2, {
					name: updateCategorySubName
				});

				return request(app.getHttpServer())
					.patch(`/api/category/${category_id_1}`)
					.send({
						name: updateCategoryName,
						thumbnail,
						subs: [{ name: updateCategorySubName, thumbnail: subThumbnail }]
					})
					.expect(409)
					.then((res) => {
						const { errors } = res.body;

						expect(errors[0].field).toEqual('category_sub');
					});
			});
		});

		describe('[MAIN]', () => {
			it('should update a category', async () => {
				const updateCategoryName = FunctionHelper.generateString(6);
				const newCategory = await categoryService.create({ name, thumbnail });

				const category_id = newCategory.id;

				return request(app.getHttpServer())
					.patch(`/api/category/${category_id}`)
					.send({
						name: updateCategoryName,
						thumbnail
					})
					.expect(200)
					.then((res) => {
						const { data } = res.body;

						expect(data.name).toEqual(updateCategoryName);
					});
			});
		});
	});

	describe('/api/category/:category_id (DELETE)', () => {
		describe('[EXCEPTION]', () => {
			it('should throw not found exception when category not be found', async () => {
				const newCategory = await categoryService.create({ name, thumbnail });
				const category_id = newCategory.id;
				await categoryService.removeById(category_id);

				return request(app.getHttpServer())
					.delete(`/api/category/${category_id}`)
					.expect(404)
					.then((res) => {
						const { errors } = res.body;

						expect(errors[0].field).toEqual('category');
					});
			});
		});

		describe('[MAIN]', () => {
			it('should remove a category', async () => {
				const newCategory = await categoryService.create({ name, thumbnail });
				const category_id = newCategory.id;

				return request(app.getHttpServer())
					.delete(`/api/category/${category_id}`)
					.expect(200)
					.then((res) => {
						const { data } = res.body;

						expect(data.id).toEqual(newCategory.id);
					});
			});
		});
	});
});
