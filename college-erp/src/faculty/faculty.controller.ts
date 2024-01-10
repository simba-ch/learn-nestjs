import { Controller } from '@nestjs/common';
import { FacultyService } from './faculty.service';

@Controller('/api/faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}
}
