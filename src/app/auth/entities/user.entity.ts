import { BeforeInsert, Column, Entity } from 'typeorm';
import { IEntity } from '../../../types/IEntity';
import * as argon2 from 'argon2';
import {
	ApiExtraModels,
	ApiProperty,
	ApiPropertyOptional
} from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
export class User extends IEntity {
	@Column()
	username!: string;

	@Column()
	email!: string;

	@Column()
	@Exclude()
	password!: string;

	@Column({ nullable: true })
	name?: string;

	@Column({ nullable: true })
	phone?: string;

	@BeforeInsert()
	async hashPassword() {
		this.password = await argon2.hash(this.password);
	}
}
