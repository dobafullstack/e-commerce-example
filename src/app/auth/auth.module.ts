import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserService } from './services/user.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, UserService]
})
export class AuthModule {}
