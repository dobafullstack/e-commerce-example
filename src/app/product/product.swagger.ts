import { applyDecorators } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	getSchemaPath
} from '@nestjs/swagger';
import { ApiConflict, ApiNotFound } from 'swaggers/response.swagger';
import { ProductImage } from './entities/product-image.entity';
import { ProductStock } from './entities/product-stock.entity';
import { Product } from './entities/product.entity';

export const ApiCreateProduct = () =>
	applyDecorators(
		ApiConflict(),
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
					code: { example: 201 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: { example: [] },
					data: {
						type: 'array',
						items: {
							$ref: getSchemaPath(Product)
						}
					}
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
					code: { example: 201 },
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

export const ApiUpdateProduct = () => applyDecorators();

export const ApiRemoveProduct = () => applyDecorators();

export const ApiCreateProductImage = () =>
	applyDecorators(
		ApiConflict(),
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

export const ApiUpdateProductImage = () => applyDecorators();

export const ApiRemoveProductImage = () => applyDecorators();

export const ApiCreateProductStock = () =>
	applyDecorators(
		ApiConflict(),
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

export const ApiUpdateProductStock = () => applyDecorators();

export const ApiRemoveProductStock = () => applyDecorators();

export const ApiCreateProductCategory = () => applyDecorators();

export const ApiRemoveProductCategory = () => applyDecorators();
