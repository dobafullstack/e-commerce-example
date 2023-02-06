import { IsNumber, IsString } from "class-validator";
import { OrderProductDto } from "./order-product.dto";
import {ValidateNested} from "validations/is-non-primitive-array.validation"

export class CreateOrderDto {
    @ValidateNested(OrderProductDto)
    order_products!: OrderProductDto[]

    @IsNumber()
    method_payment_id!: number;

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
