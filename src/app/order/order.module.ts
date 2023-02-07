import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';
import { ProductModule } from 'app/product/product.module';
import { MethodModule } from 'app/method/method.module';
import { OrderPaymentService } from './services/order-payment.service';
import { OrderDeliveryService } from './services/order-delivery.service';
import { OrderDetailService } from './services/order-detail.service';

@Module({
	controllers: [OrderController],
	providers: [OrderService, OrderPaymentService, OrderDeliveryService, OrderDetailService],
	imports: [ProductModule, MethodModule]
})
export class OrderModule {}
