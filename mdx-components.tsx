import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Callout as BaseCallout, type CalloutProps } from 'fumadocs-ui/components/callout';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from '@/components/mdx/mermaid';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Mermaid,
    Callout: ({ className, style, ...props }: CalloutProps) => (
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
