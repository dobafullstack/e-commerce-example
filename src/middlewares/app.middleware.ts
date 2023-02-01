import {
	BadRequestException,
	INestApplication,
	ValidationPipe
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { HttpExceptionFilter } from 'exceptions/exception.filter';
import { ResponseTransferInterceptor } from 'interceptors/response-transfer.interceptor';

export const applyGlobalMiddleware = (app: INestApplication) => {
	app.setGlobalPrefix('api');

	const exceptionFactory = (errors: ValidationError[]) => {
		throw new BadRequestException(
			errors.map((err) => {
				const field = err.property;
				const message = Object.values(err.constraints!);
				
				return {
					field,
					message: message.length === 1 ? message[0] : message
				};
			})
		);
	};

	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory
		})
	);

	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalInterceptors(new ResponseTransferInterceptor());
};
