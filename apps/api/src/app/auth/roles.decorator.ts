import { SetMetadata } from '@nestjs/common';
import { Role } from '../../../../../libs/interfaces/src/lib/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
