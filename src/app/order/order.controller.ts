import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'app/auth/entities/user.entity';
import { SWAGGER } from 'configs/swagger';
import { CurrentUser } from 'decorators/current-user.decorator';
import { ApiUnauthorized } from 'swaggers/response.swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
	ApiCreateOrder,
	ApiGetMyListListOrder,
	ApiGetMyOrderDetail,
	ApiUpdateOrder,
	ApiUpdateOrderDelivery,
	ApiUpdateOrderPayment
} from './order.swagger';
import { OrderService } from './services/order.service';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(SWAGGER.TAGS.ORDER)
@ApiUnauthorized()
@ApiBearerAuth()
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	@ApiCreateOrder()
	create(@CurrentUser() user: User, @Body() body: CreateOrderDto) {
		return this.orderService.create(user, body);
	}

	@Get('my_order')
	@ApiGetMyListListOrder()
	getMyListOrder(@CurrentUser() user: User) {
		return this.orderService.find({ user_id: user.id });
	}

	@Get('my_order/:id')
	@ApiGetMyOrderDetail()
	getMyOrderDetail(
		@Param('id', ParseIntPipe) id: number,
		@CurrentUser() user: User
	) {
		return this.orderService.findOneOrFail({
			id,
			user_id: user.id
		});
	}

	@Patch(':order_id')
	@ApiUpdateOrder()
	update(
		@Param('order_id', ParseIntPipe) order_id: number,
		@Body() body: UpdateOrderDto
	) {
		return this.orderService.update(order_id, body);
	}

	@Patch('payment/:order_id')
	@ApiUpdateOrderPayment()
	updatePayment(@Param('order_id', ParseIntPipe) order_id: number) {
		return this.orderService.updateOrderPayment(order_id);
	}

	@Patch('delivery/:order_id')
	@ApiUpdateOrderDelivery()
	updateDelivery(@Param('order_id', ParseIntPipe) order_id: number) {
		return this.orderService.updateOrderDelivery(order_id);
	}
}
