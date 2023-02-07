import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { User } from 'app/auth/entities/user.entity';
import { CategorySub } from 'app/category/entities/category-sub.entity';
import { Category } from 'app/category/entities/category.entity';
import { MethodDelivery } from 'app/method/entities/method-delivery.entity';
import { MethodPayment } from 'app/method/entities/method-payment.entity';
import { OrderDelivery } from 'app/order/entities/order-delivery.entity';
import { OrderDetail } from 'app/order/entities/order-detail.entity';
import { OrderPayment } from 'app/order/entities/order-payment.entity';
import { Order } from 'app/order/entities/order.entity';
import { ProductImage } from 'app/product/entities/product-image.entity';
import { ProductStock } from 'app/product/entities/product-stock.entity';
import { Product } from 'app/product/entities/product.entity';
import { SWAGGER } from 'configs/swagger';
import { Pagination } from 'types/Pagination';

export * from './response.swagger';

export const swagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle(SWAGGER.TITLE)
		.setDescription(SWAGGER.DESCRIPTION)
		.setVersion(SWAGGER.VERSION)
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
			Pagination,
			Order,
			OrderPayment,
			OrderDelivery,
			OrderDetail,
			MethodPayment,
			MethodDelivery
		]
	});

	SwaggerModule.setup(SWAGGER.PATH, app, document, {
		swaggerOptions: {
			operationsSorter: (a, b) => {
				var methodsOrder = [
				  "get",
				  "post",
				  "put",
				  "patch",
				  "delete",
				  "options",
				  "trace",
				];
				var result =
				  methodsOrder.indexOf(a.get("method")) -
				  methodsOrder.indexOf(b.get("method"));
			
				if (result === 0) {
				  result = a.get("path").localeCompare(b.get("path"));
				}
			
				return result;
			  },
		}
	});
};
