import { ApiProperty } from '@nestjs/swagger';
import {
	BaseEntity,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

export class IEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	@ApiProperty({ example: 1 })
	id!: number;

	@CreateDateColumn()
	created_at!: Date;

	@UpdateDateColumn()
	updated_at!: Date;

	@DeleteDateColumn()
	deleted_at!: Date;
}
