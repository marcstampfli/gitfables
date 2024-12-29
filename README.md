# GitFables

Transform your Git history into engaging stories. GitFables analyzes your repository's commit history and generates narrative content that makes your development journey more accessible and engaging.

## Features

- 🔄 Connect with GitHub repositories
- 📝 Generate engaging stories from commit history
- 📊 Analytics and insights
- 🔑 API access with secure authentication
- 🌙 Dark/Light mode support
- 📱 Responsive design

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Auth**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **VCS Integration**: GitHub API
- **Analytics**: Custom implementation
- **API Rate Limiting**: Upstash Redis

## Project Structure

```
src/
├── app/                # Next.js app router pages
├── components/         # React components
│   ├── analytics/     # Analytics components
│   ├── auth/          # Authentication components
│   ├── layout/        # Layout components
│   ├── providers/     # Context providers
│   ├── repositories/  # Repository management
│   ├── sections/      # Page sections
│   ├── story/         # Story components
│   ├── ui/            # UI components
│   └── visualizations/# Data visualizations
├── hooks/             # Custom React hooks
│   ├── api/          # API-related hooks
│   ├── story/        # Story management hooks
│   └── vcs/          # Version control hooks
├── lib/              # Core libraries
│   ├── analytics/    # Analytics implementation
│   ├── auth/         # Authentication logic
│   ├── redis/        # Redis client setup
│   ├── settings/     # App settings
│   ├── story/        # Story generation
│   ├── supabase/     # Database client
│   ├── utils/        # Utility functions
│   └── vcs/          # VCS integration
├── middleware/       # Next.js middleware
├── styles/          # Global styles
└── types/           # TypeScript types
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gitfables.git
   cd gitfables
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation

For detailed documentation, see the [docs](./docs) directory:

- [Architecture](./docs/architecture.md)
- [API Reference](./docs/api-reference.md)
- [Authentication](./docs/authentication.md)
- [Story Generation](./docs/story-generation.md)
- [Contributing](./docs/contributing.md)

## Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
