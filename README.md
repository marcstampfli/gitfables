# RepoTales

Turn your commit history into engaging stories. This application connects to various version control platforms (GitHub, GitLab, Bitbucket) and generates narrative stories from your commit history.

## Features

- 🔄 Multi-platform VCS support (GitHub, GitLab, Bitbucket)
- 📝 Story generation with different themes and styles
- 📊 Commit statistics and visualizations
- 🌓 Dark/light mode support
- 🎨 Beautiful and responsive UI
- 🚀 Built with modern technologies

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Octokit](https://github.com/octokit/rest.js) - GitHub API client

## Getting Started

1. Clone the repository:

```bash
git clone git@github.com:marcstampfli/repotales.git
cd repotales
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file with your environment variables:

```env
# GitHub OAuth App credentials
NEXT_PUBLIC_GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_GITHUB_REDIRECT_URI=http://localhost:3000/api/auth/callback

# Optional: GitLab and Bitbucket credentials
GITLAB_TOKEN=your_gitlab_token
BITBUCKET_TOKEN=your_bitbucket_token
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                # Next.js app router
├── components/         # React components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and libraries
│   ├── story/         # Story generation logic
│   └── vcs/          # Version control system integrations
├── types/             # TypeScript type definitions
└── styles/            # Global styles
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
