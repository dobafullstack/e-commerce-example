import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseTransferInterceptor implements NestInterceptor {
	intercept(
		context: ExecutionContext,
		next: CallHandler<any>
	): Observable<any> | Promise<Observable<any>> {
		const code = context.switchToHttp().getResponse().statusCode;

		return next.handle().pipe(
			map((res) => ({
				code,
				success: true,
				message: 'SUCCESS',
				errors: [],
				data: res
			}))
		);
	}
}
