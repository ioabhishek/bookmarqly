# Turborepo Tailwind CSS starter

This is an official starter Turborepo.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-tailwind
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is set up to produce compiled styles for `ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.js`. This was chosen for several reasons:

- Make sharing one `tailwind.config.js` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.js` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.js](packages/tailwind-config/tailwind.config.js):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `ui` package.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

cd prisma-d1-example
pnpm install prisma --save-dev
pnpm install @prisma/client
pnpm install @prisma/adapter-d1
pnpx prisma init --datasource-provider sqlite

previewFeatures = ["driverAdapters"]

pnpx wrangler d1 create prisma-demo-db

name = "prisma-d1-example"
main = "src/index.ts"
compatibility_date = "2024-03-20"
compatibility_flags = ["nodejs_compat"]

[[d1_databases]]
binding = "DB" # i.e. available in your Worker on env.DB
database_name = "bookmarqly-db"
database_id = "**YOUR_D1_DATABASE_ID**"

pnpx wrangler d1 migrations create bookmarqly-db name

add schema

pnpx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_create_user_table.sql
pnpx wrangler d1 migrations apply bookmarqly-db --local
pnpx wrangler d1 migrations apply bookmarqly-db --remote
pnpx prisma generate
pnpm run dev
pnpm run deploy

<!-- when updating schema -->

1. update your schema
2. npx wrangler d1 migrations create bookmarqly-db sql_file_name
3. pnpx prisma migrate diff --from-local-d1 --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0003_updated_schema.sql
4. pnpx wrangler d1 migrations apply bookmarqly-db --local
5. pnpx wrangler d1 migrations apply bookmarqly-db --remote
6. pnpx prisma generate
7. pnpm run dev
8. pnpm run deploy

<!-- or follow this tutorial -->

https://www.prisma.io/blog/build-applications-at-the-edge-with-prisma-orm-and-cloudflare-d1-preview
