# Getting Started with GitFables

This guide will help you set up GitFables for local development.

## Prerequisites

- Node.js 18 or later
- npm or yarn
- Git
- GitHub account (for OAuth)
- Supabase account (for database)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/marcstampfli/gitfables.git
cd gitfables
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# GitHub OAuth
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
gitfables/
├── src/
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   ├── lib/          # Utilities and services
│   └── types/        # TypeScript types
├── public/           # Static assets
└── docs/            # Documentation
```

## Development Workflow

1. Create a new branch for your feature/fix
2. Make your changes
3. Write/update tests
4. Update documentation
5. Submit a pull request

## Getting Help

1. Check the [documentation](../README.md)
2. Search [GitHub Issues](https://github.com/marcstampfli/gitfables/issues)
3. Join our [Discord Community](https://discord.gg/gitfables)
4. Email us at support@gitfables.com

## Contributing

See our [Contributing Guide](./contributing.md) for detailed information about contributing to GitFables.

## Support

- Discord: [Join our community](https://discord.gg/gitfables)
- Email: support@gitfables.com
- Twitter: [@gitfables](https://twitter.com/gitfables)
