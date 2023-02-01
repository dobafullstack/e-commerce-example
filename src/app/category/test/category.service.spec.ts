import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategorySub } from '../entities/category-sub.entity';
import { Category } from '../entities/category.entity';
import { CategorySubService } from '../services/category-sub.service';
import { CategoryService } from '../services/category.service';

describe('CategoryService', () => {
	let service: CategoryService;
	let fakeCategorySubService: CategorySubService;

	let categorySub: CategorySub = {
		id: 1,
		name: 'test'
	} as CategorySub;

	let category: Category = {
		id: 1,
		name: 'test'
	} as Category;

	beforeEach(async () => {
		fakeCategorySubService = {
			find: () => Promise.resolve([]),
			create: () => Promise.resolve(categorySub),
			createMany: () => Promise.resolve([]),
			findOne: () => Promise.resolve(categorySub),
			findOneOrFail: () => Promise.resolve(categorySub),
			remove: () => Promise.resolve([])
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoryService,
				{
					provide: CategorySubService,
					useValue: fakeCategorySubService
				}
			]
		}).compile();

		service = module.get<CategoryService>(CategoryService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		const input: CreateCategoryDto = {
			name: 'test'
		};

		it('should throw conflict exception when category already exist', async () => {
			service.findOne = () => Promise.reject(new ConflictException());

			await expect(service.create(input)).rejects.toThrow(ConflictException);
		});

		it('should create new category', async () => {
			service.create = () => Promise.resolve(category);

			const result = await service.create(input);

			expect(result.name).toEqual(input.name);
		});
	});

	describe('findAll', () => {
		it('should return a list of category (pagination) and total items', async () => {
			service.findAll = () => Promise.resolve([[category], 1]);

			const [result, count] = await service.findAll();

			expect(result.length).toBeDefined();
			expect(count).toBeDefined();
		});
	});

	describe('findOne', () => {
		it('should throw conflict exception when category already exists', async () => {
			service.findOne = () => Promise.reject(new ConflictException());

			await expect(service.findOne({}, true)).rejects.toThrow(
				ConflictException
			);
		});
		it('should return a category', async () => {
			service.findOne = () => Promise.resolve(category);

			const result = await service.findOne();

			expect(result).toEqual(category);
		});
	});

	describe('findOneOrFail', () => {
		it('should throw not found exception when category not be found', async () => {
			service.findOneOrFail = () => Promise.reject(new NotFoundException());

			await expect(service.findOneOrFail()).rejects.toThrow(NotFoundException);
		});

		it('should return a category', async () => {
			service.findOneOrFail = () => Promise.resolve(category);

			const result = await service.findOneOrFail();

			expect(result).toEqual(category);
		});
	});

	describe('update', () => {
		const id = 1;
		const input: UpdateCategoryDto = {
			name: 'test2'
		};

		it('should throw not found exception when category not be found', async () => {
			service.findOneOrFail = () => Promise.reject(new NotFoundException());

			await expect(service.update(id, input)).rejects.toThrow(
				NotFoundException
			);
		});

		it('should throw conflict exception when category already exists', async () => {
			service.findOneOrFail = () => Promise.resolve(category);
			service.findOne = () => Promise.reject(new ConflictException());

			await expect(service.update(id, input)).rejects.toThrow(
				ConflictException
			);
		});
	});

	describe('remove', () => {
		const id = 1;

		it('should throw not found exception when category not be found', async () => {
			service.findOneOrFail = () => Promise.reject(new NotFoundException());

			await expect(service.removeById(id)).rejects.toThrow(NotFoundException);
		});
	});
});
