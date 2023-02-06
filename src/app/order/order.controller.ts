import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Post,
	UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'app/auth/entities/user.entity';
import { SWAGGER } from 'configs/swagger';
import { CurrentUser } from 'decorators/current-user.decorator';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './services/order.service';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(SWAGGER.TAGS.ORDER)
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	create(@CurrentUser() user: User, @Body() body: CreateOrderDto) {
		return this.orderService.create(user, body);
	}

	@Get('my_order')
	getMyListOrder(@CurrentUser() user: User) {
		return this.orderService.find({ user_id: user.id });
	}

	@Get('my_order/:id')
	getMyOrderDetail(
		@Param('id', ParseIntPipe) id: number,
		@CurrentUser() user: User
	) {
		return this.orderService.findOneOrFail({
			id,
			user_id: user.id
		});
	}
}
