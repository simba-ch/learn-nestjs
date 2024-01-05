import { Controller, Get, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { PoliciesGuard } from 'src/policy/policies.guard';
import { CheckPolicies } from 'src/policy/check-policies.decorator';
import { articlePolicyHandler } from './article.policyHandle';
import { Action } from 'src/casl/action.enum';
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {


  }

  @Get()
  @UseGuards(PoliciesGuard)
  @CheckPolicies(articlePolicyHandler(Action.Delete))
  async findAll() {
    return this.articleService.findAll()
  }
}
