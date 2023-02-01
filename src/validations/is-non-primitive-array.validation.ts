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
					if (!value) return false;

					if (Array.isArray(value)) {
						for (let i = 0; i < (<Array<any>>value).length; i++) {
							if (typeof value[i] !== 'object') return false;

							if (validateSync(plainToClass(schema, value[i])).length) {
								return false;
							}
						}
						return true;
					} else {
						if (typeof value !== 'object') return false;

						return validateSync(plainToClass(schema, value)).length
							? false
							: true;
					}
				},
				defaultMessage(arg) {
					const args = arg as ValidationArguments;

					if (!args.value) return `${args.property} is required`;

					if (Array.isArray(args.value)) {
						let s = '';
						for (let i = 0; i < (<Array<any>>args.value).length; i++) {
							if (typeof args.value[i] !== 'object') {
								s += `${args.property}[${i}] must be a non primitive type`;
							} else {
								s += (
									`${args.property}[${i}]: ` +
									validateSync(plainToClass(schema, args.value[i]))
										.map((e) => e.constraints)
										.reduce(
											(acc, next) => acc.concat(Object.values(next as any)),
											[]
										)
										.join(', ')
								).toString();
							}
						}
						return s;
					} else {
						if (typeof args.value !== 'object') {
							return `${args.property} must be a non primitive type`;
						}

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
