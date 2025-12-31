export const GITHUB_CONFIG = {
  owner: process.env.NEXT_PUBLIC_GITHUB_OWNER || 'automata-network',
  repo: process.env.NEXT_PUBLIC_GITHUB_REPO || 'docs',
  token: process.env.GITHUB_TOKEN || '',
} as const;
