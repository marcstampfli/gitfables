# GitFables

Transform your Git commits into meaningful stories with AI-powered narrative generation.

![GitFables Banner](public/images/banner.png)

## Overview

GitFables is an innovative platform that transforms Git commit histories into engaging narratives. By leveraging AI technology, it analyzes your repository's commit history and generates comprehensive, human-readable stories that capture the evolution of your codebase.

## Features

### 🎯 Core Features

- **AI Story Generation**: Transform commit histories into coherent narratives
- **Repository Insights**: Visualize and understand your development timeline
- **Team Collaboration**: Share and collaborate on development stories
- **Custom Templates**: Tailor story generation to your needs
- **API Integration**: Seamless integration with your existing tools
- **Advanced Analytics**: Track and analyze development patterns

### 🚀 Key Benefits

- **Better Documentation**: Automatically document your development process
- **Team Communication**: Improve understanding between technical and non-technical team members
- **Time Savings**: Automate the creation of sprint reviews and changelogs
- **Project Insights**: Gain deeper understanding of your development patterns

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/gitfables-app.git
   cd gitfables-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration.

4. Start the development server:
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000` to see the application.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase
- **Authentication**: NextAuth.js
- **State Management**: React Context + Hooks
- **Testing**: Jest + React Testing Library
- **API**: REST + tRPC
- **Documentation**: TypeDoc

## Project Structure

```
gitfables-app/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   └── (marketing)/       # Marketing pages
├── components/            # React components
├── lib/                   # Utility functions
├── styles/               # Global styles
├── types/                # TypeScript types
└── public/               # Static assets
```

## Development

### Commands

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run type-check` - Run TypeScript checks

### Environment Variables

Required environment variables:

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

# Database
DATABASE_URL=your-database-url

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# API Keys
OPENAI_API_KEY=your-openai-api-key
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Documentation

- [API Reference](docs/api-reference.md)
- [Architecture Guide](docs/architecture/README.md)
- [Component Library](docs/components/README.md)
- [Feature Documentation](docs/features/README.md)

## Support

- [GitHub Issues](https://github.com/yourusername/gitfables-app/issues)
- [Discord Community](https://discord.gg/gitfables)
- [Email Support](mailto:support@gitfables.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to all our contributors
- Built with [Next.js](https://nextjs.org/)
- Powered by [OpenAI](https://openai.com/)
