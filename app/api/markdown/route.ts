import { getLLMText, source } from '@/lib/source';
import { basePath, siteUrl } from '@/lib/env';

function normalizePathname(href: string) {
  const parsed = new URL(href, siteUrl);
  let pathname = parsed.pathname;

  if (basePath && pathname.startsWith(basePath)) {
    pathname = pathname.slice(basePath.length) || '/';
  }

  const cleaned = pathname.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
  const slugs = cleaned === '/' ? [] : cleaned.slice(1).split('/').filter(Boolean);

  return slugs;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const href = searchParams.get('href');

  if (!href) {
    return new Response('Missing href parameter', { status: 400 });
  }

  let slugs: string[];
  try {
    slugs = normalizePathname(href);
  } catch {
    return new Response('Invalid href parameter', { status: 400 });
  }

  const page = source.getPage(slugs);
  if (!page) {
    return new Response('Page not found', { status: 404 });
  }

  const text = await getLLMText(page);

  return new Response(text, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=300, stale-while-revalidate',
    },
  });
}
