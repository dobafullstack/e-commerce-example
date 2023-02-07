import { User } from "app/auth/entities/user.entity";

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production' | 'test';
			PORT: string;
			ADMIN_PASSWORD: string;
			TYPEORM_HOST: string;
			TYPEORM_PORT: string;
			TYPEORM_USERNAME: string;
			TYPEORM_PASSWORD: string;
			TYPEORM_DATABASE_NAME: string;
			SECRET_JWT: string;
		}
	}
	namespace Express {
		export interface Request {
			user?: User
		}
	}
}

declare module 'jsonwebtoken' {
	function verify(
		token: string,
		secretOrPublicKey: Secret,
		options?: VerifyOptions & { complete?: false }
	): JwtPayload;

	interface JwtPayload {
		[key: string]: any;
		iss?: string | undefined;
		sub?: string | undefined;
		aud?: string | string[] | undefined;
		exp?: number | undefined;
		nbf?: number | undefined;
		iat?: number | undefined;
		jti?: string | undefined;
		id?: number;
	}
}

export {};
