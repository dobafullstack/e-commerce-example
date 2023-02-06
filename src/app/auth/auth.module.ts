import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UserService } from './services/user.service';
import { RoleService } from './services/role.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, UserService, RoleService],
	exports: [UserService]
})
export class AuthModule {}
