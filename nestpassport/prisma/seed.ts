import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)
    await prisma.user.createMany({
        data: [
            {
                username: 'john',
                password: 'changeme'
            },
            {
                username: 'chris',
                password: 'secret'
            },
            {
                username: 'maria',
                password: 'guess'
            },
        ]
    })
    console.log(`Seeding finished.`)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async () => {
        await prisma.$disconnect()
        process.exit(1)
    })