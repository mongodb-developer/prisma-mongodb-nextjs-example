import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Jesse',
    email: 'jesse@mongodb.com',
    posts: {
      create: [
        {
          title: 'Join the MongoDB Community',
          content: 'https://community.mongodb.com/',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Mira',
    email: 'mira@mongodb.com',
    posts: {
      create: [
        {
          title: 'Follow MongoDB on Twitter',
          content: 'https://www.twitter.com/mongodb',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Mike',
    email: 'mike@mongodb.com',
    posts: {
      create: [
        {
          title: 'We have a podcast!',
          content: 'https://podcasts.mongodb.com/',
          published: true,
        },
        {
          title: 'MongoDB on YouTube',
          content: 'https://www.youtube.com/c/MongoDBofficial',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
