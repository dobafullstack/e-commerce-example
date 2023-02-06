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

@Module({
	imports: [
		DatabaseModule,
		AuthModule,
		CategoryModule,
		ProductModule,
		OrderModule
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
				}
			)
			.forRoutes(CategoryController);
	}
}
