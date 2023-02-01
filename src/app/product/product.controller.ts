import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	ClassSerializerInterceptor,
	Query
} from '@nestjs/common';
import { ProductService } from './services/product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER } from 'configs/swagger';
import {
	ApiCreateProduct,
	ApiGetListProduct,
	ApiGetDetailProduct,
	ApiUpdateProduct,
	ApiRemoveProduct
} from './product.swagger';
import { GetListProductQueryDto } from './dto/get-list-product-query.dto';

@Controller('product')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(SWAGGER.TAGS.PRODUCT)
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post()
	@ApiCreateProduct()
	create(@Body() body: CreateProductDto) {
		return this.productService.create(body);
	}

	@Get()
	@ApiGetListProduct()
	findAll(@Query() query: GetListProductQueryDto) {
		return this.productService.findAll({}, query);
	}

	@Get(':id')
	@ApiGetDetailProduct()
	findOne(@Param('id') id: string) {
		return this.productService.findOne({ id: +id });
	}

	@Patch(':id')
	@ApiUpdateProduct()
	update(@Param('id') id: string, @Body() body: UpdateProductDto) {
		return this.productService.update(+id, body);
	}

	@Delete(':id')
	@ApiRemoveProduct()
	remove(@Param('id') id: string) {
		return this.productService.remove(+id);
	}
}
