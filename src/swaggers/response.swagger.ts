import {
	ApiBadRequestResponse,
	ApiConflictResponse,
	ApiNoContentResponse,
	ApiNotFoundResponse
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
