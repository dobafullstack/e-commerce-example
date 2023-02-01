import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
	BaseEntity,
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from 'typeorm';

export class IEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	id!: number;

	@CreateDateColumn()
	@Exclude()
	created_at!: Date;

	@UpdateDateColumn()
	@Exclude()
	updated_at!: Date;

	@DeleteDateColumn()
	@Exclude()
	deleted_at!: Date;
}
