import { Module } from '@nestjs/common';
import { PermissionRouteService } from './permission-route.service';
import { PermissionRouteController } from './permission-route.controller';

@Module({
  controllers: [PermissionRouteController],
  providers: [PermissionRouteService]
})
export class PermissionRouteModule {}
