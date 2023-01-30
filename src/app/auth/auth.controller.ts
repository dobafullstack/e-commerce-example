import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	HttpCode,
	Post,
	UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER } from 'configs/swagger';
import { ApiLogin, ApiRegister } from './auth.swagger';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(SWAGGER.TAGS.AUTH)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@ApiRegister()
	register(@Body() body: RegisterDto) {
		return this.authService.register(body);
	}

	@Post('login')
	@HttpCode(200)
	@ApiLogin()
	login(@Body() body: LoginDto) {
		return this.authService.login(body);
	}
}
