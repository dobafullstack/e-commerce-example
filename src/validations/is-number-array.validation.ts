import {
	ValidationOptions,
	registerDecorator,
	ValidationArguments,
	validateSync
} from 'class-validator';
import { plainToClass } from 'class-transformer';

export function IsNumberArray(validationOptions?: ValidationOptions) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'IsNumberArray',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (Array.isArray(value)) {
						for (let i = 0; i < (<Array<any>>value).length; i++) {
							if (typeof value[i] !== 'number') return false;
						}
						return true;
					}

					return false;
				},
				defaultMessage(arg) {
					const args = arg as ValidationArguments;

					if (Array.isArray(args.value)) {
						for (let i = 0; i < (<Array<any>>args.value).length; i++) {
							if (typeof args.value[i] !== 'number')
								return `${args.property}[${i}] must be a number`;
						}
					}

					return `${args.property} must be an array`;
				}
			}
		});
	};
}
