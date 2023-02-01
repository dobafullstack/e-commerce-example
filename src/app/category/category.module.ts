import { Module } from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CategoryController } from './category.controller';
import { CategorySubService } from './services/category-sub.service';

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, CategorySubService],
	exports: [CategorySubService]
})
export class CategoryModule {}
