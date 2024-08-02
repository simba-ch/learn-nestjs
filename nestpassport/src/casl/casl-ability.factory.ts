import { AbilityBuilder, createMongoAbility, InferSubjects, MongoAbility } from "@casl/ability";
import { Injectable } from "@nestjs/common";
import { Article } from "src/entities/article.entity";
import { Action } from "src/enum/caslAction";
import { User } from "src/users/users.entity";


type Subjects = InferSubjects<typeof Article | typeof User> | 'all'

export type AppAbility = MongoAbility<[Action, Subjects]>


@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

        if (user.isAdmin) {
            can(Action.Manage, 'all')
        } else {
            can(Action.Read, 'all')
        }

        can(Action.Update, Article, { authorId: user.userId })
        cannot(Action.Delete, Article, { isPublished: true })

        return build()

    }

    
}
