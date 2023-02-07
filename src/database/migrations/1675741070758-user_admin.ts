import { MigrationInterface, QueryRunner } from 'typeorm';
import * as argon2 from 'argon2';
import { ADMIN_PASSWORD } from '../../configs/env';

const username = 'admin';
const email = 'admin@gmail.com';

export class userAdmin1675741070758 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		const password = await argon2.hash(ADMIN_PASSWORD as string);

		await queryRunner.query(
			`INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DELETE FROM users WHERE username = '${username}'`);
	}
}
