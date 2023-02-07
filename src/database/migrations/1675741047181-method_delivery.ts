import { MigrationInterface, QueryRunner } from 'typeorm';
import methodsDelivery from '../../configs/method-delivery';

export class methodDelivery1675741047181 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		for (let i = 0; i < methodsDelivery.length; i++) {
			const { name, fee } = methodsDelivery[i];

			await queryRunner.query(
				`INSERT INTO methods_delivery (name, fee) VALUES ('${name}', ${fee})`
			);
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		for (let i = 0; i < methodsDelivery.length; i++) {
			const { name, fee } = methodsDelivery[i];

			await queryRunner.query(
				`DELETE FROM methods_delivery WHERE name = '${name}'`
			);
		}
	}
}
