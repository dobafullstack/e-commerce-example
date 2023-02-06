import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { User } from 'app/auth/entities/user.entity';
import { CategorySub } from 'app/category/entities/category-sub.entity';
import { Category } from 'app/category/entities/category.entity';
import { ProductImage } from 'app/product/entities/product-image.entity';
import { ProductStock } from 'app/product/entities/product-stock.entity';
import { Product } from 'app/product/entities/product.entity';
import { Pagination } from 'types/Pagination';

export * from './response.swagger';

export const swagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('E-commerce example')
		.setDescription('The E-commerce API description')
		.setVersion('1.0')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		extraModels: [
			User,
			Category,
			CategorySub,
			Product,
			ProductImage,
			ProductStock,
			Pagination
		]
	});

	SwaggerModule.setup('docs', app, document, {
		swaggerOptions: {
			operationsSorter: 'alpha'
		}
	});
};
