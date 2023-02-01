import { IsNumberString, IsOptional, IsString, ValidateIf } from "class-validator";

export class GetListCategoryQueryDto {
    @IsOptional()
    @ValidateIf((_, value) => value !== undefined)
    @IsNumberString()
    page?: string;

    @IsOptional()
    @ValidateIf((_, value) => value !== undefined)
    @IsNumberString()
    limit?: string;

    @IsOptional()
    @ValidateIf((_, value) => value !== undefined)
    @IsString()
    relation?: string;
}