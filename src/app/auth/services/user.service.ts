import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { RegisterDto } from '../dtos/register.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
	find(where?: FindOptionsWhere<User> | FindOptionsWhere<User>[] | undefined) {
		return User.find({ where });
	}

	async findOne(
		where?: FindOptionsWhere<User> | FindOptionsWhere<User>[] | undefined,
		unique: boolean = false
	) {
		const user = await User.findOne({ where });

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
			const user = await User.findOneOrFail({ where });

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

	create(input: RegisterDto) {
		return User.create({
			...input
		}).save();
	}

	remove(...users: User[]) {
		return User.softRemove(users);
	}
}
