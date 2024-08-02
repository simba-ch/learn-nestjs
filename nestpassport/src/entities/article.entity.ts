import { Article as ArticleDB } from "@prisma/client"


export class Article implements ArticleDB {
    isPublished: boolean
    authorId: string
    id: string
}