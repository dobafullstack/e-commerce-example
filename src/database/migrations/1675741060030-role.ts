import { MigrationInterface, QueryRunner } from "typeorm"
import { Roles } from "../../types/Roles"

const roles = Object.values(Roles)

export class role1675741060030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i];
            
            await queryRunner.query(
                `INSERT INTO roles (name) VALUES ('${role}')`
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (let i = 0; i < roles.length; i++) {
            const role = roles[i];
            
            await queryRunner.query(
                `DELETE FROM roles WHERE name = '${role}'`
            )
        }
    }

}
