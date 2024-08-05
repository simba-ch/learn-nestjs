import { Controller, Get, UseGuards } from '@nestjs/common';
import { CatsService } from './cats.service';
import { Role, Roles } from 'src/roles/roles.decorator';
import { Guard3Guard } from 'src/guard3/guard3.guard';

@Roles('user', 'admin')
@Role('user')
@Controller('cats')
@UseGuards(Guard3Guard)
export class CatsController {
  constructor(private readonly catsService: CatsService) { }


  @Get()
  @Roles('admin', 'superAdmin')
  @Role('admin')
  findOne() {
    return 'this is cats route request success'
  }
}
