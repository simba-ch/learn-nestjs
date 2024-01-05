import { SetMetadata } from '@nestjs/common';
import { PolicyHandler } from './policyHandler';

export const CHECK_POLICIES_KEY = "check_policy"
export const CheckPolicies = (...handlers: PolicyHandler[]) => {
    console.log("🚀 ~ file: check-policies.decorator.ts:6 ~ CheckPolicies ~ handlers:", handlers)


    return SetMetadata(CHECK_POLICIES_KEY, handlers)

};
