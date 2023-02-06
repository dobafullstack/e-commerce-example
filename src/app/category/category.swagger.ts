import { applyDecorators } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	getSchemaPath
} from '@nestjs/swagger';
import {
	ApiBadRequest,
	ApiConflict,
	ApiNotFound
} from 'swaggers/response.swagger';
import { CategorySub } from './entities/category-sub.entity';
import { Category } from './entities/category.entity';

export const ApiCreateCategory = () =>
	applyDecorators(
		ApiOperation({ summary: 'Create a new category' }),
		ApiBearerAuth(),
		ApiCreatedResponse({
			schema: {
				properties: {
					code: { example: 201 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(Category) }
				}
			}
		}),
		ApiConflict(),
		ApiBadRequest()
	);

export const ApiCreateCategorySub = () =>
	applyDecorators(
		ApiOperation({ summary: 'Create a new category sub' }),
		ApiBearerAuth(),
		ApiCreatedResponse({
			schema: {
				properties: {
					code: { example: 201 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(CategorySub) }
				}
			}
		}),
		ApiConflict(),
		ApiBadRequest()
	);

export const ApiGetListCategory = () =>
	applyDecorators(
		ApiOperation({ summary: 'Get a list of categories' }),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { type: 'array', items: { $ref: getSchemaPath(Category) } }
				}
			}
		})
	);

export const ApiGetDetailCategory = () =>
	applyDecorators(
		ApiOperation({ summary: 'Get detail a category by id' }),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(Category) }
				}
			}
		}),
		ApiNotFound()
	);

export const ApiUpdateCategory = () =>
	applyDecorators(
		ApiOperation({ summary: 'Update an category' }),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(Category) }
				}
			}
		}),
		ApiNotFound(),
		ApiConflict()
	);

export const ApiRemoveCategory = () =>
	applyDecorators(
		ApiOperation({ summary: 'Remove a category' }),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(Category) }
				}
			}
		}),
		ApiNotFound()
	);

export const ApiUpdateCategorySub = () =>
	applyDecorators(
		ApiOperation({ summary: 'Update an category sub' }),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(CategorySub) }
				}
			}
		}),
		ApiNotFound(),
		ApiConflict()
	);

export const ApiRemoveCategorySub = () =>
	applyDecorators(
		ApiOperation({ summary: 'Remove a category sub' }),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(CategorySub) }
				}
			}
		}),
		ApiNotFound()
	);
