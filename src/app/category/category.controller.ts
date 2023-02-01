import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseInterceptors,
	ClassSerializerInterceptor
} from '@nestjs/common';
import { CategoryService } from './services/category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
	ApiCreateCategory,
	ApiGetListCategory,
	ApiGetDetailCategory,
	ApiUpdateCategory,
	ApiRemoveCategory
} from './category.swagger';
import { GetListCategoryQueryDto } from './dto/get-list-category-query.dto';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER } from 'configs/swagger';

@Controller('category')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(SWAGGER.TAGS.CATEGORY)
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Post()
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
	findOne(@Param('id') id: string) {
		return this.categoryService.findOneOrFail({ id: +id });
	}

	@Patch(':id')
	@ApiUpdateCategory()
	update(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
		return this.categoryService.update(+id, body);
	}

	@Delete(':id')
	@ApiRemoveCategory()
	remove(@Param('id') id: string) {
		return this.categoryService.removeById(+id);
	}
}
