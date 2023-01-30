import { SECRET_JWT } from 'configs/env';
import * as jwt from 'jsonwebtoken';

export class FunctionHelper {
	static generateToken(payload: any) {
		return jwt.sign(payload, SECRET_JWT, {});
	}

	static generateString(length: number) {
		let result = '';
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}
		return result;
	}
}
