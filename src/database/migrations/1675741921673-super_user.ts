import { MigrationInterface, QueryRunner } from 'typeorm';
import { Roles } from '../../types/Roles';

const username = 'admin';
const roles = Object.values(Roles);

export class superUser1675741921673 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const [user] = await queryRunner.query(
			`SELECT * FROM users WHERE username = '${username}'`
		);

		for (let i = 0; i < roles.length; i++) {
			const element = roles[i];

			const [role] = await queryRunner.query(
				`SELECT * FROM roles WHERE name = '${element}'`
			);

			await queryRunner.query(
				`INSERT INTO users_roles (user_id, role_id) VALUES (${user.id}, ${role.id})`
			);
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		const [user] = await queryRunner.query(
			`SELECT * FROM users WHERE username = '${username}'`
		);

		for (let i = 0; i < roles.length; i++) {
			const element = roles[i];

			const [role] = await queryRunner.query(
				`SELECT * FROM roles WHERE name = '${element}'`
			);

			await queryRunner.query(
				`DELETE FROM users_roles WHERE user_id = ${user.id} AND role_id = ${role.id}`
			);
		}
	}
}
