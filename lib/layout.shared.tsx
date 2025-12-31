import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import HeaderBranding, { BrandMark } from '@/components/header-branding';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex max-w-full min-w-0 shrink items-center justify-start gap-1.5 lg:gap-3">
          <BrandMark />
        </div>
      ),
      component: <HeaderBranding />,
    },
  };
}
