import defaultMdxComponents from 'fumadocs-ui/mdx';
import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import { Callout as BaseCallout } from 'fumadocs-ui/components/callout';
import type { ComponentProps } from 'react';
import type { MDXComponents } from 'mdx/types';
import { Mermaid } from '@/components/mdx/mermaid';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import { Image as FrameworkImage } from 'fumadocs-core/framework';
import iconQuestion from '@/public/images/icon-question.png';
import iconLinks from '@/public/images/icon-links.png';
import iconOffenseFaas from '@/public/images/icon-offense-faas.png';
import iconDefenseShield from '@/public/images/icon-defense-shield.png';
import iconBprotocol from '@/public/images/icon-bprotocol.png';
import introIcon from '@/public/images/intro.png';

const headingIconMap: Record<string, any> = {
  '/images/icon-question.png': iconQuestion,
  '/images/icon-links.png': iconLinks,
  '/images/icon-offense-faas.png': iconOffenseFaas,
  '/images/icon-defense-shield.png': iconDefenseShield,
  '/images/icon-bprotocol.png': iconBprotocol,
  '/images/intro.png': introIcon,
};

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
      const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/mev-wiki';
      const { src, className, alt, ...restProps } = props as any;

      // For heading icons, add basePath to the src
      if (className?.includes('heading-icon') && src && typeof src === 'string') {
        const headingIconSize = 32;
        const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
        const resolvedSrc = headingIconMap[normalizedSrc] ?? `${basePath}${normalizedSrc}`;

        return (
          <FrameworkImage
            {...restProps}
            src={resolvedSrc}
            alt={alt ?? ''}
            className={className}
            width={headingIconSize}
            height={headingIconSize}
            sizes={`${headingIconSize}px`}
          />
        );
      }

      // For all other images, use ImageZoom
      return <ImageZoom {...(props as any)} />;
    },
    ...components,
  };
}
