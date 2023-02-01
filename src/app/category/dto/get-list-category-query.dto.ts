import { IsNumberString, IsString } from "class-validator";
import { IsNullable } from "validations/is-nullable.validation";

export class GetListCategoryQueryDto {
    @IsNullable()
    @IsNumberString()
    page?: string;

    @IsNullable()
    @IsNumberString()
    limit?: string;

    @IsNullable()
    @IsString()
    relation?: string;
}