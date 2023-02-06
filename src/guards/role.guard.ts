import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from 'decorators/role.decorator';
import { Request } from 'express';
import { Roles } from 'types/Roles';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<any> {
		const http = context.switchToHttp();
		const request = http.getRequest<Request>();

		const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLE_KEY, [
			context.getHandler(),
			context.getClass()
		]);

		if (!requiredRoles) return true;

		const roles = request.user?.roles.map((item) => item.name);

		const permission = requiredRoles.some((role) => roles?.includes(role));

		if (!permission) {
			throw new ForbiddenException([
				{
					field: 'user',
					message: "You don't have permission"
				}
			]);
		} else {
			return true;
		}
	}
}
