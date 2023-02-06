import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { Roles } from 'types/Roles';
import { Role } from '../entities/role.entity';

@Injectable()
export class RoleService {
	async findOneOrFail(
		where?: FindOptionsWhere<Role> | FindOptionsWhere<Role>[] | undefined
	) {
		try {
			const role = await Role.findOneOrFail({ where });

			return role;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'role',
					message: 'Role not be found'
				}
			]);
		}
	}
}
