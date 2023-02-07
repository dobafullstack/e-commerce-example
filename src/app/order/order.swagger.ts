import { applyDecorators } from '@nestjs/common';
import {
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	getSchemaPath
} from '@nestjs/swagger';
import { ApiMethodNotAllowed, ApiNotFound } from 'swaggers/response.swagger';
import { OrderDelivery } from './entities/order-delivery.entity';
import { OrderPayment } from './entities/order-payment.entity';
import { Order } from './entities/order.entity';

export const ApiCreateOrder = () =>
	applyDecorators(
		ApiOperation({ summary: 'Create a new order' }),
		ApiCreatedResponse({
			schema: {
				properties: {
					code: { example: 201 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: {
						example: []
					},
					data: {
						example: {
							id: 0,
							user_id: 0,
							order_payment_id: 0,
							order_delivery_id: 0,
							status: 'string'
						}
					}
				}
			}
		}),
		ApiNotFound()
	);

export const ApiGetMyListListOrder = () =>
	applyDecorators(
		ApiOperation({ summary: 'Get a list order of current user' }),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: {
						example: []
					},
					data: {
						type: 'array',
						items: { $ref: getSchemaPath(Order) }
					}
				}
			}
		})
	);

export const ApiGetMyOrderDetail = () =>
	applyDecorators(
		ApiOperation({ summary: 'Get a order of current user' }),
		ApiNotFound(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: {
						example: []
					},
					data: {
						$ref: getSchemaPath(Order)
					}
				}
			}
		})
	);

export const ApiUpdateOrder = () =>
	applyDecorators(
		ApiOperation({ summary: 'Update order status' }),
		ApiMethodNotAllowed(),
		ApiNotFound(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: {
						example: []
					},
					data: {
						$ref: getSchemaPath(Order)
					}
				}
			}
		})
	);

export const ApiUpdateOrderPayment = () =>
	applyDecorators(
		ApiOperation({ summary: 'Update order payment status' }),
		ApiMethodNotAllowed(),
		ApiNotFound(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: {
						example: []
					},
					data: {
						$ref: getSchemaPath(OrderPayment)
					}
				}
			}
		})
	);

export const ApiUpdateOrderDelivery = () =>
	applyDecorators(
		ApiOperation({ summary: 'Update order delivery' }),
		ApiMethodNotAllowed(),
		ApiNotFound(),
		ApiOkResponse({
			schema: {
				properties: {
					code: { example: 200 },
					success: { example: true },
					message: { example: 'SUCCESS' },
					errors: {
						example: []
					},
					data: {
						$ref: getSchemaPath(OrderDelivery)
					}
				}
			}
		})
	);
