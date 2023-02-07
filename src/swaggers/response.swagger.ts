import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiForbiddenResponse,
	ApiMethodNotAllowedResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse,
	ApiUnauthorizedResponse
} from '@nestjs/swagger';

export const ApiBadRequest = () =>
	ApiBadRequestResponse({
		schema: {
			properties: {
				code: { example: 400 },
				success: { example: false },
				message: { example: 'Bad Request Exception' },
				errors: {
					example: [
						{
							field: 'field',
							message: 'message'
						}
					]
				},
				data: { example: [] }
			}
		}
	});

export const ApiConflict = () =>
	ApiConflictResponse({
		schema: {
			properties: {
				code: { example: 409 },
				success: { example: false },
				message: { example: 'Conflict Exception' },
				errors: {
					example: [
						{
							field: 'field',
							message: 'message'
						}
					]
				},
				data: { example: [] }
			}
		}
	});

export const ApiNotFound = () =>
	ApiNotFoundResponse({
		schema: {
			properties: {
				code: { example: 404 },
				success: { example: false },
				message: { example: 'Not Found Exception' },
				errors: {
					example: [
						{
							field: 'field',
							message: 'message'
						}
					]
				},
				data: { example: [] }
			}
		}
	});

export const ApiUnauthorized = () =>
	ApiUnauthorizedResponse({
		schema: {
			properties: {
				code: { example: 401 },
				success: { example: false },
				message: { example: 'Unauthorized exception' },
				errors: {
					example: [
						{
							field: 'field',
							message: 'message'
						}
					]
				},
				data: { example: [] }
			}
		}
	});

export const ApiForbidden = () =>
	ApiForbiddenResponse({
		schema: {
			properties: {
				code: { example: 403 },
				success: { example: false },
				message: { example: 'Forbidden exception' },
				errors: {
					example: [
						{
							field: 'field',
							message: 'message'
						}
					]
				},
				data: { example: [] }
			}
		}
	});

export const ApiMethodNotAllowed = () =>
	ApiMethodNotAllowedResponse({
		schema: {
			properties: {
				code: { example: 405 },
				success: { example: false },
				message: { example: 'Method Not Allowed exception' },
				errors: {
					example: [
						{
							field: 'field',
							message: 'message'
						}
					]
				},
				data: { example: [] }
			}
		}
	});
