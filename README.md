# Headless Shopify Using Next.js

Open‑source Next.js Shopify storefront starter for building headless ecommerce experiences fast.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjobyjoseph%2Fheadless-shopify&env=NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT,NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN&envDefaults=%7B%22NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT%22%3A%22https%3A%2F%2Fyour-store-name.myshopify.com%2Fapi%2F2026-01%2Fgraphql.json%22%2C%22NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN%22%3A%22your-storefront-api-token%22%7D)

Live demo: https://headless-shopify-site.vercel.app

## Features

- Next.js v16.1.6 App Router
- Shopify Storefront API integration
- Home, PLP, PDP, Search, Signup, Login, Cart, Account pages
- Cart creation and line‑item updates
- GraphQL queries and mutations via `.graphql` files
- Better-Auth authentication
- Zod validation

## Tech stack

- Next.js v16
- React 19
- TypeScript
- Tailwind CSS
- Shopify Storefront API
- better-auth

## Requirements

- Node.js 20+
- pnpm 9+

## Getting started

1. Install dependencies
   - `pnpm install`
2. Configure environment variables
   - Copy `.env.example` → `.env` (create if missing)
3. Run the dev server
   - `pnpm dev`

Open http://localhost:3000

## Environment variables

These are required to run the app:

- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_GRAPHQL_ENDPOINT`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`

## Scripts

- `pnpm dev` – start dev server
- `pnpm build` – production build
- `pnpm start` – start production server
- `pnpm lint` – run linting

## Deployment

This project works well on Vercel. Set the environment variables above in your Vercel project settings, then deploy.

## Project structure

- `src/app` – routes, pages, and layouts
- `src/integrations/shopify` – Storefront API queries and mutations
- `src/components` – shared UI components
- `src/providers` – app‑wide providers
- `src/utils` – utilities

## Contributing

Contributions are welcome. Please open an issue or submit a PR.

1. Fork the repo
2. Create a feature branch
3. Commit changes
4. Open a pull request

## Security

If you discover a security issue, please email reachjoby@gmail.com.

## License

MIT. See [LICENSE](LICENSE).

## Changelog

[Changelog.md](Changelog.md)
