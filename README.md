# GitFables

Transform your Git history into engaging stories. GitFables analyzes your repository's commit history and generates narrative content that makes your development journey more accessible and engaging.

## Features

- 🔄 Connect with GitHub repositories
- 📝 Generate engaging stories from commit history
- 📊 Analytics and insights
- 🔑 Beautiful, responsive UI with dark/light mode
- 🔒 Secure authentication with Supabase
- 📱 Mobile-first design

## Tech Stack

- **Framework**: Next.js 14 with App Router and Server Components
- **Language**: TypeScript
- **Auth & Database**: Supabase (Auth, PostgreSQL)
- **Styling**: Tailwind CSS + Shadcn UI
- **State Management**: React Server Components + Client Hooks
- **Type Safety**: End-to-end type safety with generated types
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── (auth)/        # Authentication routes
│   ├── (dashboard)/   # Protected dashboard routes
│   ├── (marketing)/   # Public marketing pages
│   └── api/           # API routes
├── components/         # React components
│   ├── analytics/     # Analytics components
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard components
│   ├── layout/        # Layout components
│   ├── story/         # Story components
│   └── ui/            # Shadcn UI components
├── hooks/             # Custom React hooks
├── lib/              # Core libraries
│   ├── auth/         # Authentication logic
│   ├── story/        # Story generation
│   ├── supabase/     # Database client
│   └── utils/        # Utility functions
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
   # Supabase configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   SUPABASE_DB_PASSWORD=your_supabase_db_password
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Documentation

For detailed documentation, see the [docs](./docs) directory:

- [Architecture Overview](./docs/architecture/README.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [API Reference](./docs/api-reference.md)
- [Authentication](./docs/authentication.md)
- [Story Generation](./docs/story-generation.md)

## Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
