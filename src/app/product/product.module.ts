import { Module } from '@nestjs/common';
import { ProductService } from './services/product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from 'app/category/category.module';
import { ProductImageService } from './services/product-image.service';
import { ProductStockService } from './services/product-stock.service';

@Module({
	controllers: [ProductController],
	providers: [ProductService, ProductImageService, ProductStockService],
	imports: [CategoryModule]
})
export class ProductModule {}
