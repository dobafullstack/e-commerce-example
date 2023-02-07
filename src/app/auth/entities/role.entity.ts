import { Column, Entity } from 'typeorm';
import { IEntity } from '../../../types/IEntity';
import { Roles } from '../../../types/Roles';

@Entity({ name: 'roles' })
export class Role extends IEntity {
	@Column()
	name!: Roles;
}
