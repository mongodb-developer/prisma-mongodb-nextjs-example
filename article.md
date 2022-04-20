Did you know that Prisma now supports MongoDB? In this article, we'll take a look at how to use Prisma to connect to MongoDB.

## What is Prisma?

Prisma is an open source ORM (Object Relational Mapper) for Node.js. It supports both JavaScript and TypeScript. It really shines when using TypeScript, helping you to write code that is both readable and type-safe.

## Why Prisma? 

Without a schema, MongoDB users could run into data inconsistency issues over time. While you can define a schema at the database level within MongoDB Atlas, Prisma lets you define a schema at the application level. When using the Prisma Client, a developer gets the aid of auto-completing queries, since the Prisma Client is aware of the schema.

## Data Modeling

Generally, data that is accessed together should be stored together in a MongoDB database. However, there may be use cases where you'll need to store related data in separate collections. In this instance, Prisma can assist you in organizing this related data and maintaining referential integrity of the data.

## Prisma & MongoDB in action

We are going to take an existing example project from the [prisma-examples](https://github.com/prisma/prisma-examples) repository and use Prisma to connect to MongoDB.

There is a [fullstack example with Next.js](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes). This example uses a SQLite database. We'll convert it to use MongoDB and seed some dummy data.

> If you want to see the final code, you can find it [here](https://github.com/mongodb-developer/prisma-nextjs-example).

### Prisma configuration

We'll first need to set up our environment variable to connect to our MongoDB Atlas database. I'll add my MongoDB Atlas connection string to a `.env` file. 

Example: 
```
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/prisma?retryWrites=true&w=majority"
```

> You can get your connection string from the Atlas dashboard.

Now, let's edit the `schema.prisma` file.

> If you are using Visual Studio Code, be sure to install the official [Prisma VS Code extension](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) to help with formatting and auto-completion.

In the `datasource db` object, we'll set the `provider` to "mongodb" and the url to our environment variable `MONGODB_URI`.

For the `User` model, we'll need to update the `id`. Instead of an `Int`, we'll use `String`. We'll set the default to `auto()`. Since MongoDB names the id field `_id`, we'll map the `id` field to `_id`. Lastly, we'll tell Prisma to use the data type of `ObjectId` for the `id` field.

We'll do the same for the `Post` model `id` field. We'll also change the `authorId` field to `String` and set the data type to `ObjectId`.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id    String  @id @default(auto()) @map("_id") @db.ObjectId
  email String  @unique
  name  String?
  posts Post[]
}

model Post {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String
  content   String?
  published Boolean  @default(false)
  viewCount Int      @default(0)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String   @db.ObjectId
}
```

Now that we have our schema set up, let's run `npm i` to get everything installed. This will also run `prisma generate` for us.

> If you make any changes later to the schema, you'll need to run `npx prisma generate` again.

### Create and seed the database

If you don’t already have a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register2) account, it's easy to sign up.

Next, we need to seed our database. The repo comes with a `prisma/seed.ts` file with some dummy data. 

So, let's run the following command to seed our database:

```
npx prisma db seed
```

> This also creates the `User` and `Post` collections that are defined in `prisma/schema.prisma`.

### Other updates to the example code

Because we made some changes to the `id` data type, we'll need to update some of the example code to reflect these changes.

The updates are in the `api/post/[id].ts` and `api/publish/[id].ts` files.

Here's one example. We need to remove the `Number()` call from the reference to the `id` field since it is now a `String`.

```js
// BEFORE
async function handleGET(postId, res) {
  const post = await prisma.post.findUnique({
    where: { id: Number(postId) },
    include: { author: true },
  })
  res.json(post)
}

// AFTER
async function handleGET(postId, res) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  })
  res.json(post)
}
```

### Run the app

Those are all of the updates needed. We can now run the app and we should see the seed data show up.

```bash
npm run dev
```

We can open the app in the browser at `http://localhost:3000/`.

