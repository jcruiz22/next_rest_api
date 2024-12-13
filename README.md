# Next.js REST API Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It includes a REST API for managing users, categories, and blogs using MongoDB and Mongoose.

Made only to shed some rust and practice

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## API Endpoints

### Users

- **GET** `/api/(auth)/users` - Fetch all users
- **POST** `/api/(auth)/users` - Create a new user
- **PATCH** `/api/(auth)/users` - Update a user
- **DELETE** `/api/(auth)/users` - Delete a user

### Categories

- **GET** `/api/(dashboard)/categories` - Fetch all categories for a user
- **POST** `/api/(dashboard)/categories` - Create a new category
- **PATCH** `/api/(dashboard)/categories/[category]` - Update a category
- **DELETE** `/api/(dashboard)/categories/[category]` - Delete a category

### Blogs

- **GET** `/api/(dashboard)/blogs` - Fetch all blogs for a category
- **POST** `/api/(dashboard)/blogs` - Create a new blog
- **PATCH** `/api/(dashboard)/blogs/[blog]` - Update a blog
- **DELETE** `/api/(dashboard)/blogs/[blog]` - Delete a blog

## Environment Variables

Create a `.env` file in the root directory and add your MongoDB URI:

```env
MONGODB_URI=your_mongodb_uri
```
