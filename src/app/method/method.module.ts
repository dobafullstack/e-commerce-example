import { MethodDeliveryService } from './services/method-delivery.service';
import { Module } from '@nestjs/common';
import { MethodController } from './method.controller';
import { MethodPaymentService } from './services/method-payment.service';

@Module({
	controllers: [MethodController],
	providers: [MethodPaymentService, MethodDeliveryService],
	exports: [MethodPaymentService, MethodDeliveryService]
})
export class MethodModule {}
