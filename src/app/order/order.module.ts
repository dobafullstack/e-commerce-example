import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';

@Module({
	controllers: [OrderController],
	providers: [OrderService]
})
export class OrderModule {}
