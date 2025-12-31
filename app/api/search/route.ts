import { source } from '@/lib/source';
import { createFromSource } from 'fumadocs-core/search/server';

// Base search server
const searchServer = createFromSource(source, {
  language: 'english',
});

function matchesAllTokens(text: string, tokens: string[]) {
  const haystack = text.toLowerCase();
  return tokens.every((t) => haystack.includes(t));
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get('q')?.trim().toLowerCase() ?? '';
  if (!query) {
    return searchServer.GET(request);
  }

  // Run the default search first
  const res = await searchServer.GET(request);
  const data = await res.json();

  // Require that every token in the query appears in the result fields
  const tokens = query.split(/\s+/).filter(Boolean);
  const filteredHits =
    Array.isArray(data.hits) && tokens.length > 0
      ? data.hits.filter((hit: any) => {
          const doc = hit?.document ?? {};
          const text = [
            doc.title ?? '',
            doc.description ?? '',
            doc.url ?? '',
            JSON.stringify(doc.structuredData ?? ''),
          ].join(' ').toLowerCase();
          return matchesAllTokens(text, tokens);
        })
      : data.hits ?? [];

  return Response.json({
    ...data,
    hits: filteredHits,
    count: filteredHits.length,
  });
}
