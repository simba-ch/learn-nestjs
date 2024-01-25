import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { Prisma } from "@prisma/client";
@Injectable()
export class AppService {

  constructor(private readonly prismaService: PrismaService) {
    this.prismaService.$extends({
      name:"signUp",
      model:{
        user:{},
        post:{}
      }
    })
   }
  getHello(): string {
    return 'Hello World!';
  }

  // getPost() {
  //   return this.prismaService.post.findFirst({
  //     where: {
  //       id: "falfkl;akflsd"
  //     },
  //     include: {
  //       categories: {
  //         include: {
  //           category: true
  //         }
  //       }
  //     }

  //   })
  // }

  // createPost() {
  //   this.prismaService.post.create({
  //     data: {
  //       title: "How to be Bob",
  //       author: {
  //         connect: {
  //           id: ""
  //         }
  //       },
  //       categories: {
  //         create: [
  //           {
  //             assignedAt: new Date(),
  //             assignedBy: "Bob",

  //             category: {

  //               create: {

  //                 name: "New category",

  //               }
  //             }
  //           }
  //         ]
  //       }
  //     }
  //   })
  // }



  temp() {
    Prisma.validator<Prisma.UserDefaultArgs>()({
      select: { email: true, name: true }
    })
    this.prismaService.$use
  }
}
