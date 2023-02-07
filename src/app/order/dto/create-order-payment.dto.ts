import { IsNumber } from 'class-validator';

export class CreateOrderPaymentDto {
	@IsNumber()
	method_payment_id!: number;

	@IsNumber()
	amount!: number;
}
