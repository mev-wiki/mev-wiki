const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const normalizedBasePath = (() => {
  if (!rawBasePath || rawBasePath === '/') return '';
  const withLeading = rawBasePath.startsWith('/')
    ? rawBasePath
    : `/${rawBasePath}`;
  return withLeading.replace(/\/+$/, '');
})();

export const basePath = normalizedBasePath;

export const withBasePath = (path: string) => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (!basePath) return normalized;
  return `${basePath}${normalized}`.replace(/\/{2,}/g, '/');
};

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mev.wiki/';

export const siteUrl = (() => {
  const url = new URL(rawSiteUrl.replace(/\/?$/, '/'));
  if (!basePath) return url.toString();

  const cleanedPath = url.pathname.replace(/\/+$/, '');
  if (cleanedPath.endsWith(basePath)) {
    url.pathname = `${cleanedPath}/`.replace(/\/{2,}/g, '/');
    return url.toString();
  }

  url.pathname = `${cleanedPath}${basePath}/`.replace(/\/{2,}/g, '/');

  return url.toString();
})();
