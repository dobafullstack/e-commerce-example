import { MigrationInterface, QueryRunner } from 'typeorm';
import methodsPayment from '../../configs/method-payment';

export class methodPayment1675741042345 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		for (let i = 0; i < methodsPayment.length; i++) {
			const methodPayment = methodsPayment[i];

			await queryRunner.query(
				`INSERT INTO methods_payment (name) VALUES ('${methodPayment}')`
			);
		}
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
        for (let i = 0; i < methodsPayment.length; i++) {
			const methodPayment = methodsPayment[i];

			await queryRunner.query(
				`DELETE FROM methods_payment WHERE name = ('${methodPayment}')`
			);
		}
    }
}
