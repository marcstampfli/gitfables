# Getting Started with RepoTales

This guide will help you set up RepoTales for local development.

## Prerequisites

- Node.js 18.x or later
- Git
- GitHub account
- npm or yarn

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/marcstampfli/repotales-app.git
cd repotales-app
```

2. **Install Dependencies**

```bash
npm install
```

3. **Environment Setup**
   Copy the example environment file:

```bash
cp .env.example .env.local
```

Update the following variables in `.env.local`:

```env
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Start Development Server**

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```
repotales-app/
├── src/
│   ├── app/                 # Next.js pages
│   ├── components/          # React components
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilities
│   └── styles/             # Global styles
├── public/                 # Static assets
├── docs/                   # Documentation
└── tests/                  # Test files
```

## Development Workflow

1. **Create a Feature Branch**

```bash
git checkout -b feature/your-feature-name
```

2. **Make Changes**

- Follow the [component guidelines](../components/README.md)
- Add tests for new features
- Update documentation

3. **Run Tests**

```bash
npm run test        # Run unit tests
npm run test:e2e    # Run E2E tests
npm run lint        # Run linter
```

4. **Submit Changes**

```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

Create a Pull Request on GitHub.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:e2e` - Run E2E tests

## GitHub Setup

1. Create a new OAuth App:

   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Set Homepage URL: `http://localhost:3000`
   - Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

2. Copy credentials to `.env.local`

## Supabase Setup

1. Create a new Supabase project
2. Copy project URL and anon key to `.env.local`
3. Run database migrations:

```bash
npm run supabase:migrate
```

## Common Issues

### Authentication Issues

- Verify GitHub OAuth credentials
- Check callback URLs
- Ensure environment variables are set

### Build Errors

- Clear `.next` directory
- Remove `node_modules` and reinstall
- Check Node.js version

### Type Errors

- Run `npm run type-check`
- Update TypeScript dependencies
- Check type definitions

## Next Steps

1. Review the [Architecture Documentation](../architecture/README.md)
2. Explore [Components](../components/README.md)
3. Check [Features Documentation](../features/README.md)
4. Join our [Discord Community](https://discord.gg/repotales)

## Contributing

See our [Contributing Guide](./contributing.md) for detailed information about contributing to RepoTales.

## Support

- GitHub Issues: Bug reports and feature requests
- Discord: Community support and discussions
- Email: support@repotales.dev
