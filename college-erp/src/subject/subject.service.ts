import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Prisma, Subject } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class SubjectService {
    constructor(private readonly prismaService: PrismaService,
        @Inject(forwardRef(() => StudentService))
        private readonly studentService: StudentService) { }

    async find(where?: Prisma.SubjectWhereInput): Promise<Subject[] | undefined> {
        return this.prismaService.subject.findMany({ where })
    }

    async findOne(where?: Prisma.SubjectWhereInput): Promise<Subject | undefined> {
        return this.prismaService.subject.findFirst({
            where
        })
    }


    async create(data: Prisma.SubjectCreateInput): Promise<Subject> {
        const newSubject = await this.prismaService.subject.create({
            data,
        })
        const { department, year } = data
        const students = await this.studentService.find({ department, year });
        const createData = students.map(student => ({
            studentId: student.id,
            subjectId: newSubject.id
        }))

        this.prismaService.studentOfSubject.createMany({
            data: createData
        })

        return newSubject
    }

    async delete(where: Prisma.SubjectWhereUniqueInput) {
        return this.prismaService.subject.delete({ where })
    }

    async update(where: Prisma.SubjectWhereUniqueInput, data: Prisma.SubjectUpdateInput) {
        return this.prismaService.subject.update({
            where,
            data
        })
    }
}
