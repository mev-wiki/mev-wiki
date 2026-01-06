import { getLLMText, source } from '@/lib/source';
import { withBasePath } from '@/lib/env';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const pages = source.getPages();

  const entries = await Promise.all(
    pages.map(async (page) => {
      const pathWithBase = withBasePath(`/${page.slugs.join('/')}`).replace(/\/+$/, '') || '/';
      // Provide basePath-stripped alias so lookups work regardless of basePath handling in the client.
      const pathWithoutBase = pathWithBase.replace(
        new RegExp(`^${withBasePath('/').replace(/\/$/, '')}`),
        '',
      ) || '/';
      const markdown = await getLLMText(page);
      return {
        path: pathWithBase,
        pathAlias: pathWithoutBase.startsWith('/') ? pathWithoutBase : `/${pathWithoutBase}`,
        markdown,
      };
    }),
  );

  return Response.json({
    generatedAt: new Date().toISOString(),
    pages: entries,
  });
}
