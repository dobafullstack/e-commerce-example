import { IsNumber, IsString } from 'class-validator';

export class CreateOrderDeliveryDto {
	@IsNumber()
	method_delivery_id!: number;

	@IsString()
	address!: string;

	@IsString()
	ward!: string;

	@IsString()
	district!: string;

	@IsString()
	city!: string;
}
