import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from 'src/types';

export const CHECK_POLICIES_KEY = 'check_policy'

export const CheckPolicies = (...handlers: PolicyHandler[]) => SetMetadata('check-policies', handlers);
