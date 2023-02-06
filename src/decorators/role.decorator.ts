import { SetMetadata } from '@nestjs/common';
import { Roles } from 'types/Roles';

export const ROLE_KEY = 'roles';
export const UseRole = (...roles: Roles[]) => SetMetadata(ROLE_KEY, roles);
