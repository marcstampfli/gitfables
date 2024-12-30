# GitFables

<div align="center">
  <h3>Transform Your Git History into Engaging Stories</h3>
  <p>GitFables uses AI to analyze your repository's commit history and generate narrative content that makes your development journey more accessible and engaging.</p>

  <p>
    <a href="https://gitfables.com">Website</a> ·
    <a href="./docs/getting-started.md">Documentation</a> ·
    <a href="https://github.com/marcstampfli/gitfables/issues">Issues</a> ·
    <a href="https://github.com/marcstampfli/gitfables/discussions">Discussions</a>
  </p>
</div>

## ✨ Features

- 🔄 **VCS Integration**
  - GitHub OAuth integration with granular permissions
  - Repository connection and automatic sync
  - GitLab & Bitbucket support coming soon
- 📝 **Story Generation**
  - AI-powered narrative generation from commit history
  - Multiple story formats and styles
  - Technical and non-technical versions
  - Rich markdown formatting
- 📊 **Analytics & Insights**
  - Repository activity tracking
  - Story engagement metrics
  - API key usage monitoring
  - Export data in multiple formats
- 🎨 **Modern UI/UX**
  - Beautiful, responsive design
  - Light/dark mode with system preference
  - High contrast and reduced motion options
  - Mobile-first approach
- 🔒 **Security & Privacy**
  - Secure authentication with Supabase
  - Granular repository access control
  - Data encryption at rest
  - Regular security audits
- 🌐 **API Access**
  - RESTful API for integration
  - Comprehensive API documentation
  - Rate limiting and usage quotas
  - API key management

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router and Server Components
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type safety
- **Auth & Database**: [Supabase](https://supabase.com/) for authentication and PostgreSQL
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: React Server Components + Client Hooks
- **Type Safety**: End-to-end type safety with generated types
- **Deployment**: [Vercel](https://vercel.com/) for seamless deployment

## 📁 Project Structure

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
│   ├── repositories/  # Repository components
│   ├── settings/      # Settings components
│   ├── story/         # Story components
│   └── ui/            # Shadcn UI components
├── hooks/             # Custom React hooks
│   ├── api/          # API-related hooks
│   ├── settings/     # Settings hooks
│   └── vcs/          # VCS provider hooks
├── lib/              # Core libraries
│   ├── actions/      # Server actions
│   ├── supabase/     # Database client
│   ├── utils/        # Utility functions
│   └── vcs/          # VCS provider implementations
└── types/           # TypeScript types
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or pnpm
- Git
- A Supabase account
- A GitHub account (for OAuth setup)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/marcstampfli/gitfables.git
   cd gitfables
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   pnpm install
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

   # GitHub OAuth configuration
   GITHUB_CLIENT_ID=your_github_client_id
   GITHUB_CLIENT_SECRET=your_github_client_secret
   ```

4. Set up the database:

   ```bash
   npm run db:setup
   # or
   pnpm db:setup
   ```

5. Run the development server:

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Documentation

For detailed documentation, see the [docs](./docs) directory:

- [Getting Started Guide](./docs/guides/getting-started.md)
- [Architecture Overview](./docs/architecture/README.md)
- [Development Guide](./docs/DEVELOPMENT.md)
- [API Reference](./docs/api-reference.md)
- [Authentication](./docs/authentication.md)
- [Story Generation](./docs/features/story-generation.md)
- [Repository Management](./docs/features/repositories.md)

## 🔑 Key Features

### VCS Integration

- OAuth-based secure authentication
- Granular repository access control
- Automatic repository sync
- Support for private repositories

### Story Generation

- AI-powered analysis of commits
- Multiple narrative styles
- Technical and non-technical versions
- Rich markdown formatting
- Export to multiple formats

### Settings & Customization

- Theme customization
  - Light/dark/system modes
  - Custom accent colors
  - Font preferences
- Accessibility features
  - High contrast mode
  - Reduced motion
  - Font size options
- Notification preferences
- Privacy controls

### API Access

- RESTful API endpoints
- API key management
- Usage tracking and analytics
- Rate limiting and quotas
- Export usage statistics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details on:

- Code of Conduct
- Development process
- Pull request guidelines
- Issue reporting
- Feature requests

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for auth and database
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn UI](https://ui.shadcn.com/) for UI components
- [Vercel](https://vercel.com/) for hosting
- All our [contributors](https://github.com/marcstampfli/gitfables/graphs/contributors)
