import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { IsNullable } from 'validations/is-nullable.validation';

export class GetListProductQueryDto {
	@IsNullable()
	@IsNumberString()
	@ApiProperty({ example: 1 })
	page?: string;

	@IsNullable()
	@IsNumberString()
	@ApiProperty({ example: 10 })
	limit?: string;

	@IsNullable()
	@IsNumberString()
	@ApiProperty({ example: 'name' })
	order_by?: string;

	@IsNullable()
	@IsNumberString()
	@ApiProperty({ example: 'ASC, DESC' })
	sort?: string;
}
