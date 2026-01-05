import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Callout as BaseCallout } from 'fumadocs-ui/components/callout';
import type { ComponentProps } from 'react';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from '@/components/mdx/mermaid';
import * as TabsComponents from 'fumadocs-ui/components/tabs';

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
    img: (props) => <ImageZoom {...(props as any)} />,
    ...components,
  };
}
