import * as argon2 from 'argon2';
import { Exclude, Transform } from 'class-transformer';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { IEntity } from '../../../types/IEntity';
import { Role } from './role.entity';

@Entity({ name: 'users' })
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

	@ManyToMany(() => Role)
	@JoinTable({
		name: 'users_roles',
		joinColumn: { name: 'user_id' },
		inverseJoinColumn: { name: 'role_id' }
	})
	@Transform(({ value }) => value.map((item) => item.name))
	roles!: Role[];

	@BeforeInsert()
	async hashPassword() {
		this.password = await argon2.hash(this.password);
	}
}
