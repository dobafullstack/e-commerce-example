import { applyDecorators } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	getSchemaPath
} from '@nestjs/swagger';
import { ApiConflict, ApiNotFound } from 'swaggers/response.swagger';
import { Pagination } from 'types/Pagination';
import { ProductImage } from './entities/product-image.entity';
import { ProductStock } from './entities/product-stock.entity';
import { Product } from './entities/product.entity';

export const ApiCreateProduct = () =>
	applyDecorators(
		ApiConflict(),
		ApiNotFound(),
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
		ApiNotFound(),
		ApiConflict(),
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

export const ApiCreateProductImage = () =>
	applyDecorators(
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
		ApiNotFound(),
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
		ApiNotFound(),
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
		ApiNotFound(),
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
		ApiNotFound(),
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

export const ApiCreateProductCategory = () => applyDecorators(
	ApiNotFound(),
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

export const ApiRemoveProductCategory = () => applyDecorators(
	ApiNotFound(),
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
