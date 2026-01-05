import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Callout as BaseCallout } from 'fumadocs-ui/components/callout';
import type { ComponentProps } from 'react';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from '@/components/mdx/mermaid';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { withBasePath } from '@/lib/env';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...TabsComponents,
    Mermaid,
    Callout: ({ className, style, ...props }: ComponentProps<typeof BaseCallout>) => (
      <BaseCallout
        {...props}
        className={['break-words', className].filter(Boolean).join(' ')}
        style={{ wordBreak: 'break-word', overflowWrap: 'anywhere', ...style }}
      />
    ),
    img: (props) => {
      const { src, className, alt, ...restProps } = props as any;

      // For heading icons, add basePath to the src
      if (className?.includes('heading-icon') && src && typeof src === 'string') {
        const resolvedSrc = withBasePath(src);

        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            {...restProps}
            src={resolvedSrc}
            alt={alt ?? ''}
            className={className}
            width={32}
            height={32}
          />
        );
      }

      // For all other images, use ImageZoom
      return <ImageZoom {...(props as any)} />;
    },
    ...components,
  };
}
