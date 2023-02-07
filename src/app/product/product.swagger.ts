import { applyDecorators } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	getSchemaPath
} from '@nestjs/swagger';
import {
	ApiConflict,
	ApiForbidden,
	ApiNotFound,
	ApiUnauthorized
} from 'swaggers/response.swagger';
import { Pagination } from 'types/Pagination';
import { ProductImage } from './entities/product-image.entity';
import { ProductStock } from './entities/product-stock.entity';
import { Product } from './entities/product.entity';

export const ApiCreateProduct = () =>
	applyDecorators(
		ApiOperation({summary: "Create a new product"}),
		ApiConflict(),
		ApiNotFound(),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiCreatedResponse({
			schema: {
				properties: {
					code: { example: 201 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(Product) }
				}
			}
		})
	);

export const ApiGetListProduct = () =>
	applyDecorators(
		ApiOperation({summary: "Get a list of product"}),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: {
						type: 'array',
						items: {
							$ref: getSchemaPath(Product)
						}
					},
					pagination: { $ref: getSchemaPath(Pagination) }
				}
			}
		})
	);

export const ApiGetDetailProduct = () =>
	applyDecorators(
		ApiOperation({summary: "Get detail a product"}),
		ApiNotFound(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: {
						$ref: getSchemaPath(Product)
					}
				}
			}
		})
	);

export const ApiUpdateProduct = () =>
	applyDecorators(
		ApiOperation({summary: "Update a product"}),
		ApiNotFound(),
		ApiConflict(),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: {
						$ref: getSchemaPath(Product)
					}
				}
			}
		})
	);

export const ApiRemoveProduct = () =>
	applyDecorators(
		ApiOperation({summary: "Remove a product"}),
		ApiNotFound(),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: {
						$ref: getSchemaPath(Product)
					}
				}
			}
		})
	);

export const ApiCreateProductImage = () =>
	applyDecorators(
		ApiOperation({summary: "Add image for a product"}),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiCreatedResponse({
			schema: {
				properties: {
					code: { example: 201 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(ProductImage) }
				}
			}
		})
	);

export const ApiUpdateProductImage = () =>
	applyDecorators(
		ApiOperation({summary: "Update an image of product"}),
		ApiNotFound(),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(ProductImage) }
				}
			}
		})
	);

export const ApiRemoveProductImage = () =>
	applyDecorators(
		ApiOperation({summary: "Remove an image from product"}),
		ApiNotFound(),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(ProductImage) }
				}
			}
		})
	);

export const ApiCreateProductStock = () =>
	applyDecorators(
		ApiOperation({summary: "Create a stock for product"}),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiCreatedResponse({
			schema: {
				properties: {
					code: { example: 201 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(ProductStock) }
				}
			}
		})
	);

export const ApiUpdateProductStock = () =>
	applyDecorators(
		ApiOperation({summary: "Update stock for a product"}),
		ApiNotFound(),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(ProductStock) }
				}
			}
		})
	);

export const ApiRemoveProductStock = () =>
	applyDecorators(
		ApiOperation({summary: "Remove a stock from product"}),
		ApiNotFound(),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(ProductStock) }
				}
			}
		})
	);

export const ApiCreateProductCategory = () =>
	applyDecorators(
		ApiOperation({summary: "Add a category for product"}),
		ApiNotFound(),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(Product) }
				}
			}
		})
	);

export const ApiRemoveProductCategory = () =>
	applyDecorators(
		ApiOperation({summary: "Remove a category from product"}),
		ApiNotFound(),
		ApiUnauthorized(),
		ApiForbidden(),
		ApiBearerAuth(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: { $ref: getSchemaPath(Product) }
				}
			}
		})
	);
