import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseTransferInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Observable<any> | Promise<Observable<any>> {
		const request = context.switchToHttp().getRequest<Request>();
		const code = context.switchToHttp().getResponse().statusCode;

		return next.handle().pipe(
			map((res) => {
				if (Array.isArray(res)) {
					const { page = 1, limit = 10 } = request.query;
					const [data, count] = res;

					return {
						code,
						success: true,
						message: 'SUCCESS',
						errors: [],
						data,
						pagination: {
							page: +page,
							limit: +limit,
							totalPage: Math.ceil(count / +limit)
						}
					};
				}

				return {
					code,
					success: true,
					message: 'SUCCESS',
					errors: [],
					data: res
				};
			})
		);
	}
}
