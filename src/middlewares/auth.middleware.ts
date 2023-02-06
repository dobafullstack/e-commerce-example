import {
	Injectable,
	NestMiddleware,
	UnauthorizedException
} from '@nestjs/common';
import { SECRET_JWT } from 'configs/env';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from './../app/auth/services/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	constructor(private readonly userService: UserService) {}

	async use(req: Request, res: Response, next: (error?: any) => void) {
		let user_id;
		const bearerToken = req.headers['authorization'];

		if (!bearerToken) {
			throw new UnauthorizedException([
				{
					field: 'authorization',
					message: 'Missing access token'
				}
			]);
		}

		const token = bearerToken.split(' ')[1];

		if (!token) {
			throw new UnauthorizedException([
				{
					field: 'authorization',
					message: 'access token malformed'
				}
			]);
		}

		jwt.verify(
			token,
			SECRET_JWT,
			(err: jwt.VerifyErrors | null, decode: jwt.JwtPayload) => {
				if (err) {
					throw new UnauthorizedException([
						{
							field: 'jwt',
							message: err.message
						}
					]);
				}

				user_id = decode.id;
			}
		);

		const user = await this.userService.findOneOrFail({ id: user_id });

		req.user = user;

		next();
	}
}
