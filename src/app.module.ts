import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './app/auth/auth.module';
import { CategoryModule } from './app/category/category.module';
import { ProductModule } from './app/product/product.module';
import { OrderModule } from './app/order/order.module';

@Module({
	imports: [DatabaseModule, AuthModule, CategoryModule, ProductModule, OrderModule],
	controllers: [],
	providers: []
})
export class AppModule {}
