import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER } from 'configs/swagger';
import { UseRole } from 'decorators/role.decorator';
import { Roles } from 'types/Roles';
import {
	ApiCreateCategory,
	ApiCreateCategorySub,
	ApiGetDetailCategory,
	ApiGetListCategory,
	ApiRemoveCategory,
	ApiRemoveCategorySub,
	ApiUpdateCategory,
	ApiUpdateCategorySub
} from './category.swagger';
import { CreateCategorySubDto } from './dto/create-category-sub.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetListCategoryQueryDto } from './dto/get-list-category-query.dto';
import { UpdateCategorySubDto } from './dto/update-category-sub.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategorySubService } from './services/category-sub.service';
import { CategoryService } from './services/category.service';

@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(SWAGGER.TAGS.CATEGORY)
export class CategoryController {
	constructor(
		private readonly categoryService: CategoryService,
		private readonly categorySubService: CategorySubService
	) {}

	@Post()
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiCreateCategory()
	create(@Body() body: CreateCategoryDto) {
		return this.categoryService.create(body);
	}

	@Get()
	@ApiGetListCategory()
	findAll(@Query() query: GetListCategoryQueryDto) {
		return this.categoryService.findAll({}, query);
	}

	@Get(':id')
	@ApiGetDetailCategory()
	findOne(@Param('id', ParseIntPipe) id: string) {
		return this.categoryService.findOneOrFail({ id: +id });
	}

	@Patch(':id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiUpdateCategory()
	update(
		@Param('id', ParseIntPipe) id: string,
		@Body() body: UpdateCategoryDto
	) {
		return this.categoryService.update(+id, body);
	}

	@Delete(':id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiRemoveCategory()
	remove(@Param('id', ParseIntPipe) id: string) {
		return this.categoryService.removeById(+id);
	}

	@Post('subs/:category_id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiCreateCategorySub()
	createSub(
		@Param('category_id', ParseIntPipe) category_id: string,
		@Body() body: CreateCategorySubDto
	) {
		return this.categorySubService.create(+category_id, body);
	}
	@Patch('subs/:id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiUpdateCategorySub()
	updateSub(
		@Param('id', ParseIntPipe) id: string,
		@Body() body: UpdateCategorySubDto
	) {
		return this.categorySubService.update(+id, body);
	}

	@Delete('subs/:id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiRemoveCategorySub()
	removeSub(@Param('id', ParseIntPipe) id: string) {
		return this.categorySubService.removeById(+id);
	}
}
