import { applyDecorators } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	getSchemaPath
} from '@nestjs/swagger';
import { ApiBadRequest, ApiConflict, ApiNotFound } from 'swaggers/swagger';
import { User } from './entities/user.entity';

export const ApiRegister = () =>
	applyDecorators(
		ApiBadRequest(),
		ApiConflict(),
		ApiCreatedResponse({
			schema: {
				properties: {
					code: { example: 201 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(User) }
				}
			}
		})
	);

export const ApiLogin = () =>
	applyDecorators(
		ApiBadRequest(),
		ApiNotFound(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { example: { token: 'token' } }
				}
			}
		})
	);
