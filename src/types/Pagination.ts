import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class Pagination {
	@IsNumber()
	@ApiProperty({ example: 0 })
	page!: number;

	@IsNumber()
	@ApiProperty({ example: 0 })
	limit!: number;

	@IsNumber()
	@ApiProperty({ example: 0 })
	total_page!: number;
}
