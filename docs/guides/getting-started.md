# Getting Started with GitFables

This guide will help you get started with GitFables, whether you're setting up for local development or using the platform.

## Using GitFables

### 1. Create an Account

1. Visit [GitFables](https://gitfables.com)
2. Click "Sign In" and choose your preferred method:
   - GitHub (recommended)
   - Email/Password
   - Magic Link (passwordless)

### 2. Connect Your Repository

1. Navigate to Dashboard
2. Click "Connect Repository"
3. Select GitHub as your provider
4. Choose repositories to connect
5. Configure sync settings

### 3. Generate Your First Story

1. Select a connected repository
2. Choose generation settings:
   - Style (technical, narrative, casual)
   - Content focus
   - Included elements
3. Click "Generate Story"

### 4. Customize Settings

1. Visit Settings to configure:
   - Theme preferences
   - Notification settings
   - Privacy options
   - Accessibility features

## Local Development

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Git
- GitHub account
- Supabase account

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/gitfables/gitfables.git
cd gitfables
```

2. **Install Dependencies**

```bash
npm install
# or
yarn install
```

3. **Environment Setup**

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# GitHub OAuth
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# API Configuration
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_DURATION=60

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_API_ACCESS=true
```

4. **Database Setup**

```bash
# Apply migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

5. **Start Development Server**

```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Project Structure

```
gitfables/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── (auth)/      # Authentication routes
│   │   ├── (dashboard)/ # Protected routes
│   │   ├── (marketing)/ # Public pages
│   │   └── api/         # API routes
│   ├── components/       # React components
│   │   ├── analytics/   # Analytics components
│   │   ├── auth/        # Auth components
│   │   ├── dashboard/   # Dashboard components
│   │   ├── layout/      # Layout components
│   │   ├── repositories/# Repository components
│   │   ├── settings/    # Settings components
│   │   ├── story/       # Story components
│   │   └── ui/          # Shadcn UI components
│   ├── hooks/           # Custom React hooks
│   │   ├── api/        # API hooks
│   │   ├── settings/   # Settings hooks
│   │   └── vcs/        # VCS provider hooks
│   ├── lib/            # Core libraries
│   │   ├── actions/    # Server actions
│   │   ├── supabase/   # Database client
│   │   ├── utils/      # Utility functions
│   │   └── vcs/        # VCS providers
│   └── types/          # TypeScript types
├── public/             # Static assets
└── docs/              # Documentation
```

### Development Workflow

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**

   - Follow code style guidelines
   - Add tests where needed
   - Update documentation

3. **Run Tests**

   ```bash
   # Unit tests
   npm run test

   # E2E tests
   npm run test:e2e
   ```

4. **Check Types and Lint**

   ```bash
   # Type checking
   npm run type-check

   # Linting
   npm run lint
   ```

5. **Submit Pull Request**
   - Fill out PR template
   - Add screenshots if UI changes
   - Link related issues

## Documentation

- [Architecture Overview](../architecture.md)
- [API Reference](../api-reference.md)
- [Contributing Guide](../contributing.md)
- [Feature Documentation](../features/)

## Getting Help

1. **Documentation**

   - [User Guide](https://docs.gitfables.com)
   - [API Reference](https://docs.gitfables.com/api)
   - [FAQ](https://docs.gitfables.com/faq)

2. **Community**

   - [Discord](https://discord.gg/gitfables)
   - [GitHub Discussions](https://github.com/gitfables/gitfables/discussions)
   - [Stack Overflow](https://stackoverflow.com/questions/tagged/gitfables)

3. **Support**
   - [Email Support](mailto:support@gitfables.com)
   - [Twitter](https://twitter.com/gitfables)
   - [Status Page](https://status.gitfables.com)

## Contributing

See our [Contributing Guide](../contributing.md) for detailed information about:

- Code of Conduct
- Development process
- Pull request guidelines
- Testing requirements
- Documentation standards

## License

GitFables is open-source software licensed under the [MIT license](../../LICENSE).
