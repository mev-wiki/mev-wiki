import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getGithubLastEdit } from 'fumadocs-core/content/github';
import { GITHUB_CONFIG } from '@/lib/constants';

export default async function Page(props: PageProps<'/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  let lastModified = null;
  // try {
  //   lastModified = await getGithubLastEdit({
  //     owner: GITHUB_CONFIG.owner,
  //     repo: GITHUB_CONFIG.repo,
  //     path: `content/docs/${page.slugs.join('/')}.mdx`,
  //     token: GITHUB_CONFIG.token,
  //   });
  // } catch (error) {
  //   console.error('Failed to fetch last modified time:', error);
  // }

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      lastUpdate={lastModified ?? undefined}
      tableOfContent={{
        enabled: true,
        style: 'normal',
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
