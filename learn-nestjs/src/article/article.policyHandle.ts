import { Action } from "src/casl/action.enum";
import { AppAbility } from "src/casl/casl-ability.factory";
import { Article } from "src/casl/entityes";



export function deleteArticlePolicyHandler(ability: AppAbility, request: any) {
    const { article } = request.body
    return ability.can(Action.Delete, article)
}



export const articlePolicyHandler = (action: Action) => (ability: AppAbility, request: any) => {
    const { article:articleObj } = request.body
    const article = new Article(articleObj)
    return ability.can(action, article)
}
