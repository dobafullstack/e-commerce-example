import { IsEnum } from 'class-validator';
import { OrderStatus } from 'types/Order';

export class UpdateOrderDto {
	@IsEnum(OrderStatus)
	status!: OrderStatus;
}
