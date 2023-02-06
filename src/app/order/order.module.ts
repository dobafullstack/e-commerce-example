import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { OrderController } from './order.controller';
import { ProductModule } from 'app/product/product.module';
import { MethodModule } from 'app/method/method.module';

@Module({
	controllers: [OrderController],
	providers: [OrderService],
	imports: [ProductModule, MethodModule]
})
export class OrderModule {}
