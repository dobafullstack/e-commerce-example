import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from '../category.controller';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategorySub } from '../entities/category-sub.entity';
import { CategorySubService } from '../services/category-sub.service';
import { CategoryService } from '../services/category.service';

describe('CategoryController', () => {
	let controller: CategoryController;
	let fakeCategorySubService: CategorySubService;
	let categoryService: CategoryService;
	let categorySub: CategorySub = {
		id: 1,
		name: 'test'
	} as CategorySub;

	const createCategoryDto: CreateCategoryDto = {
		name: 'test',
		thumbnail: 'test',
		subs: [{ name: 'test', thumbnail: 'test' }]
	};

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
			controllers: [CategoryController],
			providers: [
				CategoryService,
				{
					provide: CategorySubService,
					useValue: fakeCategorySubService
				}
			]
		}).compile();

		controller = module.get<CategoryController>(CategoryController);
		categoryService = module.get<CategoryService>(CategoryService);
	});

	it('should define controller', () => expect(controller).toBeDefined());

	describe('create', () => {
		it('should throw conflict exception when category already exists', async () => {
			categoryService.findOne = () => Promise.reject(new ConflictException());

			await expect(controller.create(createCategoryDto)).rejects.toThrow(
				ConflictException
			);
		});
		it('should throw conflict exception when category sub already exists', async () => {
			fakeCategorySubService.findOne = () => Promise.reject(new ConflictException());

			await expect(controller.create(createCategoryDto)).rejects.toThrow(
				ConflictException
			);
		});
	});

	// describe('findAll', () => {});

	// describe('findOne', () => {});

	// describe('update', () => {});

	// describe('remove', () => {});
});
