import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { User } from 'app/auth/entities/user.entity';
import { SWAGGER } from 'configs/swagger';

export * from './response.swagger';

export const swagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('E-commerce example')
		.setDescription('The E-commerce API description')
		.setVersion('1.0')
		.addBearerAuth()
		.addTag(SWAGGER.TAGS.AUTH)
		.build();

	const document = SwaggerModule.createDocument(app, config, {
		extraModels: [User]
	});

	SwaggerModule.setup('docs', app, document);
};
