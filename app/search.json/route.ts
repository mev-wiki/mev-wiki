import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '@/lib/source';

const searchServer = createFromSource(source, {
  language: 'english',
});

export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  return searchServer.staticGET();
}
