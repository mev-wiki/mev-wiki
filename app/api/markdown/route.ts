import { getLLMText, source } from '@/lib/source';
import { withBasePath } from '@/lib/env';

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const pages = source.getPages();

  const entries = await Promise.all(
    pages.map(async (page) => {
      const path = withBasePath(`/${page.slugs.join('/')}`).replace(/\/+$/, '') || '/';
      const markdown = await getLLMText(page);
      return { path, markdown };
    }),
  );

  return Response.json({
    generatedAt: new Date().toISOString(),
    pages: entries,
  });
}
