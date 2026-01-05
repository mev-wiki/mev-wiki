import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const basePath = rawBasePath && rawBasePath !== '/'
  ? (rawBasePath.startsWith('/') ? rawBasePath : `/${rawBasePath}`).replace(/\/+$/, '')
  : '';
const isStaticExport =
  process.env.NEXT_EXPORT === 'true' ||
  process.env.NEXT_PUBLIC_GITHUB_PAGES === 'true';
const assetPrefix =
  process.env.NEXT_PUBLIC_ASSET_PREFIX ?? (basePath || undefined);

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: isStaticExport ? 'export' : undefined,
  trailingSlash: isStaticExport,
  basePath: basePath || undefined,
  assetPrefix,
  images: {
    unoptimized: isStaticExport,
  },
};

export default withMDX(config);
