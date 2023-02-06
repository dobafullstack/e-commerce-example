import {
	ClassSerializerInterceptor, Controller, UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER } from 'configs/swagger';

@Controller('method')
@ApiTags(SWAGGER.TAGS.METHOD)
@UseInterceptors(ClassSerializerInterceptor)
export class MethodController {
	constructor() {}
}
