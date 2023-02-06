import { CreateProductImageDto } from './create-product-image.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProductImageDto extends PartialType(CreateProductImageDto) {}
