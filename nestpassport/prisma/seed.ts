import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    console.log(`Start seeding ...`)
    await prisma.user.createMany({
        data: [
            {
                username: 'john',
                password: 'changeme',
                isAdmin: true
            },
            {
                username: 'chris',
                password: 'secret',
                isAdmin: false
            },
            {
                username: 'maria',
                password: 'guess',
                isAdmin: false
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