import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { Roles } from 'types/Roles';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '../entities/user.entity';
import { RoleService } from './role.service';

@Injectable()
export class UserService {
	constructor(private readonly roleService: RoleService) {}

	find(where?: FindOptionsWhere<User> | FindOptionsWhere<User>[] | undefined) {
		return User.find({ where, relations: ["roles"] });
	}

	async findOne(
		where?: FindOptionsWhere<User> | FindOptionsWhere<User>[] | undefined,
		unique: boolean = false
	) {
		const user = await User.findOne({ where, relations: ["roles"] });

		if (unique && user) {
			throw new ConflictException([
				{
					field: 'user',
					message: 'User already exist'
				}
			]);
		}

		return user;
	}

	async findOneOrFail(
		where?: FindOptionsWhere<User> | FindOptionsWhere<User>[] | undefined
	) {
		try {
			const user = await User.findOneOrFail({ where, relations: ["roles"] });

			return user;
		} catch (error) {
			throw new NotFoundException([
				{
					field: 'user',
					message: 'User not found'
				}
			]);
		}
	}

	async create(input: RegisterDto) {
		const role = await this.roleService.findOneOrFail({ name: Roles.CLIENT });

		return User.create({
			...input,
			roles: [role]
		}).save();
	}

	remove(...users: User[]) {
		return User.softRemove(users);
	}
}
