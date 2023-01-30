require('dotenv').config({
	path: `.env.${process.env.NODE_ENV}`
});

import { NestFactory } from '@nestjs/core';
import { PORT } from 'configs/env';
import { AppModule } from './app.module';
import { applyGlobalMiddleware } from './middlewares/app.middleware';
import { swagger } from './swaggers/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	applyGlobalMiddleware(app);
	swagger(app);

	await app.listen(PORT || 3000);
}
bootstrap();
