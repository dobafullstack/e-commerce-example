import { MigrationInterface, QueryRunner } from "typeorm";

export class initial1675740977713 implements MigrationInterface {
    name = 'initial1675740977713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`methods_delivery\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`fee\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders_delivery\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`method_delivery_id\` int NOT NULL, \`address\` varchar(255) NOT NULL, \`ward\` varchar(255) NOT NULL, \`district\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`status\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`thumbnail\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categories_sub\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`thumbnail\` varchar(255) NULL, \`category_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_image\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`url\` varchar(255) NOT NULL, \`product_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_stock\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`option_name\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`product_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`sku\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`description\` varchar(255) NULL, \`thumbnail\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`order_id\` int NOT NULL, \`product_id\` int NOT NULL, \`price\` int NOT NULL, \`quantity\` int NOT NULL, \`option_name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`methods_payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders_payment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`method_payment_id\` int NOT NULL, \`amount\` int NOT NULL, \`status\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`order_payment_id\` int NOT NULL, \`order_delivery_id\` int NOT NULL, \`user_id\` int NOT NULL, \`status\` varchar(255) NOT NULL DEFAULT 'pending', UNIQUE INDEX \`REL_553e5a4802b3188e7f7f218dfe\` (\`order_payment_id\`), UNIQUE INDEX \`REL_0771809bc8c2825c4a48a2400b\` (\`order_delivery_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`name\` varchar(255) NULL, \`phone\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products_categories\` (\`product_id\` int NOT NULL, \`category_id\` int NOT NULL, INDEX \`IDX_f2c76a4306a82c696d620f81f0\` (\`product_id\`), INDEX \`IDX_19fe0fe8c2fcf1cbe1a80f639f\` (\`category_id\`), PRIMARY KEY (\`product_id\`, \`category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_roles\` (\`user_id\` int NOT NULL, \`role_id\` int NOT NULL, INDEX \`IDX_e4435209df12bc1f001e536017\` (\`user_id\`), INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders_delivery\` ADD CONSTRAINT \`FK_bc0f444265dc1c3f1b8583dc995\` FOREIGN KEY (\`method_delivery_id\`) REFERENCES \`methods_delivery\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`categories_sub\` ADD CONSTRAINT \`FK_dfdaae43c29627eae499a88ae75\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_image\` ADD CONSTRAINT \`FK_151ce3859550c6a0fd357560875\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_stock\` ADD CONSTRAINT \`FK_0eb0805fcc1a9e15566567a0a83\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_detail\` ADD CONSTRAINT \`FK_5b0e6f7131af630c7ab92400fe0\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_detail\` ADD CONSTRAINT \`FK_b86d62e2c98b558e4acf531f9ef\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders_payment\` ADD CONSTRAINT \`FK_7c1e2f766e0cbec7e9a1d989774\` FOREIGN KEY (\`method_payment_id\`) REFERENCES \`methods_payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_553e5a4802b3188e7f7f218dfe3\` FOREIGN KEY (\`order_payment_id\`) REFERENCES \`orders_payment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_0771809bc8c2825c4a48a2400b2\` FOREIGN KEY (\`order_delivery_id\`) REFERENCES \`orders_delivery\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_a922b820eeef29ac1c6800e826a\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`products_categories\` ADD CONSTRAINT \`FK_f2c76a4306a82c696d620f81f08\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`products_categories\` ADD CONSTRAINT \`FK_19fe0fe8c2fcf1cbe1a80f639f1\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories_sub\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_e4435209df12bc1f001e5360174\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`users_roles\` ADD CONSTRAINT \`FK_1cf664021f00b9cc1ff95e17de4\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_1cf664021f00b9cc1ff95e17de4\``);
        await queryRunner.query(`ALTER TABLE \`users_roles\` DROP FOREIGN KEY \`FK_e4435209df12bc1f001e5360174\``);
        await queryRunner.query(`ALTER TABLE \`products_categories\` DROP FOREIGN KEY \`FK_19fe0fe8c2fcf1cbe1a80f639f1\``);
        await queryRunner.query(`ALTER TABLE \`products_categories\` DROP FOREIGN KEY \`FK_f2c76a4306a82c696d620f81f08\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_a922b820eeef29ac1c6800e826a\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_0771809bc8c2825c4a48a2400b2\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_553e5a4802b3188e7f7f218dfe3\``);
        await queryRunner.query(`ALTER TABLE \`orders_payment\` DROP FOREIGN KEY \`FK_7c1e2f766e0cbec7e9a1d989774\``);
        await queryRunner.query(`ALTER TABLE \`orders_detail\` DROP FOREIGN KEY \`FK_b86d62e2c98b558e4acf531f9ef\``);
        await queryRunner.query(`ALTER TABLE \`orders_detail\` DROP FOREIGN KEY \`FK_5b0e6f7131af630c7ab92400fe0\``);
        await queryRunner.query(`ALTER TABLE \`products_stock\` DROP FOREIGN KEY \`FK_0eb0805fcc1a9e15566567a0a83\``);
        await queryRunner.query(`ALTER TABLE \`products_image\` DROP FOREIGN KEY \`FK_151ce3859550c6a0fd357560875\``);
        await queryRunner.query(`ALTER TABLE \`categories_sub\` DROP FOREIGN KEY \`FK_dfdaae43c29627eae499a88ae75\``);
        await queryRunner.query(`ALTER TABLE \`orders_delivery\` DROP FOREIGN KEY \`FK_bc0f444265dc1c3f1b8583dc995\``);
        await queryRunner.query(`DROP INDEX \`IDX_1cf664021f00b9cc1ff95e17de\` ON \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_e4435209df12bc1f001e536017\` ON \`users_roles\``);
        await queryRunner.query(`DROP TABLE \`users_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_19fe0fe8c2fcf1cbe1a80f639f\` ON \`products_categories\``);
        await queryRunner.query(`DROP INDEX \`IDX_f2c76a4306a82c696d620f81f0\` ON \`products_categories\``);
        await queryRunner.query(`DROP TABLE \`products_categories\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`REL_0771809bc8c2825c4a48a2400b\` ON \`orders\``);
        await queryRunner.query(`DROP INDEX \`REL_553e5a4802b3188e7f7f218dfe\` ON \`orders\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`orders_payment\``);
        await queryRunner.query(`DROP TABLE \`methods_payment\``);
        await queryRunner.query(`DROP TABLE \`orders_detail\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`products_stock\``);
        await queryRunner.query(`DROP TABLE \`products_image\``);
        await queryRunner.query(`DROP TABLE \`categories_sub\``);
        await queryRunner.query(`DROP TABLE \`categories\``);
        await queryRunner.query(`DROP TABLE \`orders_delivery\``);
        await queryRunner.query(`DROP TABLE \`methods_delivery\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
