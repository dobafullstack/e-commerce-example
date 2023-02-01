import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseInterceptors,
	ClassSerializerInterceptor
} from '@nestjs/common';
import { OrderService } from './services/order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER } from 'configs/swagger';
import { ApiCreateOrder, ApiGetListOrder, ApiGetDetailOrder, ApiUpdateOrder, ApiRemoveOrder } from './order.swagger';

@Controller('order')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(SWAGGER.TAGS.ORDER)
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Post()
	@ApiCreateOrder()
	create(@Body() createOrderDto: CreateOrderDto) {
		return this.orderService.create(createOrderDto);
	}

	@Get()
	@ApiGetListOrder()
	findAll() {
		return this.orderService.findAll();
	}

	@Get(':id')
	@ApiGetDetailOrder()
	findOne(@Param('id') id: string) {
		return this.orderService.findOne(+id);
	}

	@Patch(':id')
	@ApiUpdateOrder()
	update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
		return this.orderService.update(+id, updateOrderDto);
	}

	@Delete(':id')
	@ApiRemoveOrder()
	remove(@Param('id') id: string) {
		return this.orderService.remove(+id);
	}
}
