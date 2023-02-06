import {
	MiddlewareConsumer,
	Module,
	NestModule,
	RequestMethod
} from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './app/auth/auth.module';
import { CategoryModule } from './app/category/category.module';
import { ProductModule } from './app/product/product.module';
import { OrderModule } from './app/order/order.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'guards/role.guard';
import { CategoryController } from 'app/category/category.controller';
import { AuthMiddleware } from 'middlewares/auth.middleware';
import { MethodModule } from './app/method/method.module';
import { ProductController } from 'app/product/product.controller';
import { OrderController } from 'app/order/order.controller';
import { MethodController } from 'app/method/method.controller';

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		CategoryModule,
		ProductModule,
		OrderModule,
		MethodModule
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: RoleGuard
		}
	]
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AuthMiddleware)
			.exclude(
				{
					path: '/api/category/',
					method: RequestMethod.GET
				},
				{
					path: '/api/category/:id',
					method: RequestMethod.GET
				},
				{
					path: '/api/product',
					method: RequestMethod.GET
				},
				{
					path: '/api/product/:id',
					method: RequestMethod.GET
				}
			)
			.forRoutes(
				CategoryController,
				ProductController,
				OrderController,
				MethodController
			);
	}
}
