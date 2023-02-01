import {
	ValidationOptions,
	registerDecorator,
	ValidationArguments,
	validateSync
} from 'class-validator';
import { plainToClass } from 'class-transformer';

export function ValidateNested(
	schema: new () => any,
	validationOptions?: ValidationOptions
) {
	return function (object: Object, propertyName: string) {
		registerDecorator({
			name: 'ValidateNested',
			target: object.constructor,
			propertyName: propertyName,
			constraints: [],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (Array.isArray(value)) {
						for (let i = 0; i < (<Array<any>>value).length; i++) {
							if (validateSync(plainToClass(schema, value[i])).length) {
								return false;
							}
						}
						return true;
					} else
						return validateSync(plainToClass(schema, value)).length
							? false
							: true;
				},
				defaultMessage(arg) {
					const args = arg as ValidationArguments;

					if (Array.isArray(args.value)) {
						let s = '';
						for (let i = 0; i < (<Array<any>>args.value).length; i++) {
							s += (
								`${args.property}[${i}]: ` +
								validateSync(plainToClass(schema, args.value[i]))
									.map((e) => e.constraints)
									.reduce(
										(acc, next) => acc.concat(Object.values(next as any)),
										[]
									)
							).toString();
						}
						return s;
					} else {
						return (
							`${args.property}: ` +
							validateSync(plainToClass(schema, args.value))
								.map((e) => e.constraints)
								.reduce(
									(acc, next) => acc.concat(Object.values(next as any)),
									[]
								)
						).toString();
					}
				}
			}
		});
	};
}
