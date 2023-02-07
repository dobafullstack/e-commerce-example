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
	Query,
	ParseIntPipe
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
	ApiRemoveProduct,
	ApiCreateProductCategory,
	ApiCreateProductImage,
	ApiCreateProductStock,
	ApiRemoveProductCategory,
	ApiRemoveProductImage,
	ApiRemoveProductStock,
	ApiUpdateProductImage,
	ApiUpdateProductStock
} from './product.swagger';
import { GetListProductQueryDto } from './dto/get-list-product-query.dto';
import { ProductImageService } from './services/product-image.service';
import { ProductStockService } from './services/product-stock.service';
import { CreateProductImageDto } from './dto/create-product-image.dto';
import { UpdateProductImageDto } from './dto/update-product-image.dto';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { ProductCategoryDto } from './dto/add-product-category.dto';
import { UseRole } from 'decorators/role.decorator';
import { Roles } from 'types/Roles';

@Controller('product')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(SWAGGER.TAGS.PRODUCT)
export class ProductController {
	constructor(
		private readonly productService: ProductService,
		private readonly productImageService: ProductImageService,
		private readonly productStockService: ProductStockService
	) {}

	@Post()
	@UseRole(Roles.ADMIN, Roles.STAFF)
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
	findOne(@Param('id', ParseIntPipe) id: number) {
		return this.productService.findOne({ id });
	}

	@Patch(':id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiUpdateProduct()
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdateProductDto
	) {
		return this.productService.update(id, body);
	}

	@Delete(':id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiRemoveProduct()
	remove(@Param('id', ParseIntPipe) id: number) {
		return this.productService.remove(id);
	}

	@Post('image/:product_id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiCreateProductImage()
	createImage(
		@Param('product_id', ParseIntPipe) product_id: number,
		@Body() body: CreateProductImageDto
	) {
		return this.productImageService.create(product_id, body);
	}
	@Patch('image/:id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiUpdateProductImage()
	updateImage(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdateProductImageDto
	) {
		return this.productImageService.update(id, body);
	}
	@Delete('image/:id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiRemoveProductImage()
	removeImage(@Param('id', ParseIntPipe) id: number) {
		return this.productImageService.remove(id);
	}

	@Post('stock')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiCreateProductStock()
	createStock(
		@Param('product_id', ParseIntPipe) product_id: number,
		@Body() body: CreateProductStockDto
	) {
		return this.productStockService.create(product_id, body);
	}
	@Patch('stock/:id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiUpdateProductStock()
	updateStock(
		@Param('id', ParseIntPipe) id: number,
		@Body() body: UpdateProductStockDto
	) {
		return this.productStockService.update(id, body);
	}
	@Delete('stock/:id')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiRemoveProductStock()
	removeStock(@Param('id', ParseIntPipe) id: number) {
		return this.productStockService.remove(+id);
	}

	@Post('category')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiCreateProductCategory()
	addCategory(@Body() body: ProductCategoryDto) {
		return this.productService.addCategory(body);
	}
	@Delete('category')
	@UseRole(Roles.ADMIN, Roles.STAFF)
	@ApiRemoveProductCategory()
	removeCategory(@Body() body: ProductCategoryDto) {
		return this.productService.removeCategory(body);
	}
}
