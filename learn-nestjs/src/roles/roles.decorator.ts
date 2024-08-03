import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => {
    console.log('roles decorator');

    return SetMetadata('roles', roles);
}
