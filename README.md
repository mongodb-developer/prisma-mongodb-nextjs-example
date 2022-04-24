# Fullstack Example with Next.js (REST API)

This example shows how to implement a **fullstack app in TypeScript with [Next.js](https://nextjs.org/), [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/), and [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client)**. It uses a MongoDB Atlas database with some initial dummy data.

> Original source code: [prisma/prisma-examples](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-nextjs-api-routes)

## Getting started

### 1. Download example and install dependencies

Clone this repository:

```bash
git clone git@github.com:mongodb-developer/prisma-nextjs-example.git
```

Install npm dependencies:

```bash
npm install
```

### 2. Create and seed the database

If you don’t already have a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register2) account, it's easy to sign up.

Rename the `.env.example` file to `.env` and add your MongoDB Atlas connection string.

Run the following command to create and seed your MongoDB Atlas database. This also creates the `User` and `Post` collections that are defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```bash
npx prisma db seed
```

### 3. Start the app

```bash
npm run dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

<details><summary>Expand for a tour through the UI of the app</summary>

<br />

**Blog** (located in [`./pages/index.tsx`](./pages/index.tsx))

![](https://imgur.com/eepbOUO.png)

**Signup** (located in [`./pages/signup.tsx`](./pages/signup.tsx))

![](https://imgur.com/iE6OaBI.png)

**Create post (draft)** (located in [`./pages/create.tsx`](./pages/create.tsx))

![](https://imgur.com/olCWRNv.png)

**Drafts** (located in [`./pages/drafts.tsx`](./pages/drafts.tsx))

![](https://imgur.com/PSMzhcd.png)

**View post** (located in [`./pages/p/[id].tsx`](./pages/p/[id].tsx)) (delete or publish here)

![](https://imgur.com/zS1B11O.png)

</details>

## Using the REST API

You can also access the REST API of the API server directly. It is running on the same host machine and port and can be accessed via the `/api` route (in this case that is `localhost:3000/api/`, so you can e.g. reach the API with [`localhost:3000/api/feed`](http://localhost:3000/api/feed)).

### `GET`

- `/api/post/:id`: Fetch a single post by its `id`
- `/api/feed`: Fetch all _published_ posts
- `/api/filterPosts?searchString={searchString}`: Filter posts by `title` or `content`

### `POST`

- `/api/post`: Create a new post
  - Body:
    - `title: String` (required): The title of the post
    - `content: String` (optional): The content of the post
    - `authorEmail: String` (required): The email of the user that creates the post
- `/api/user`: Create a new user
  - Body:
    - `email: String` (required): The email address of the user
    - `name: String` (optional): The name of the user

### `PUT`

- `/api/publish/:id`: Publish a post by its `id`

### `DELETE`
  
- `/api/post/:id`: Delete a post by its `id`

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback in the [`MongoDB Community`](https://community.mongodb.com/)
