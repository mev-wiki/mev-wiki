import { visit } from 'unist-util-visit';
import type { Root } from 'hast';
import { withBasePath } from '@/lib/env';

/**
 * Prefix /images/* paths with the configured basePath so assets work on subpath deployments.
 * Falls back to '/mev-wiki' to match the GitHub Pages repo path when env is missing.
 */
export function rehypeBasePathImages() {
  const fallbackBasePath = '/mev-wiki';

  return (tree: Root) => {
    visit(tree, 'element', (node: any) => {
      const props = node.properties;
      if (!props || node.tagName !== 'img') return;

      const src = props.src;
      if (typeof src !== 'string') return;

      // Only touch site-local images.
      if (!src.startsWith('/images/')) return;

      const maybePrefixed = withBasePath(src);
      props.src =
        maybePrefixed === src ? `${fallbackBasePath}${src}` : maybePrefixed;
    });
  };
}
