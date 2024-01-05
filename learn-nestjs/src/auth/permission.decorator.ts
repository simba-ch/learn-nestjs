import { SetMetadata } from '@nestjs/common';

export const ROUTE = "route"
export const Permission = (route: string) => SetMetadata(ROUTE, route);
