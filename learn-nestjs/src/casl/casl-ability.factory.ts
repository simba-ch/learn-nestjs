import { Injectable } from "@nestjs/common";
import { AbilityBuilder, ExtractSubjectType, InferSubjects, MongoAbility, createMongoAbility } from "@casl/ability";
import { Article, User } from "./entityes";
import { Action } from "./action.enum";


type Subjects = InferSubjects<typeof Article | typeof User> | "all"

export type AppAbility = MongoAbility<[Action, Subjects]>

@Injectable()
export class CaslAbilityFactory {

    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility)
        cannot(Action.Delete, Article, { isPublished: true })
        if (user.isAdmin) {
            can(Action.Manage, "all")
        } else {
            can(Action.Read, "all")
        }

        can(Action.Update, Article, { authorId: user.id })
       

        return build({
            detectSubjectType: item => item.constructor as ExtractSubjectType<Subjects>
        })
    }
}
