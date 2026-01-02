'use client';

import Link from 'fumadocs-core/link';
import { SearchToggle } from 'fumadocs-ui/components/layout/search-toggle';
import { Navbar, SidebarTrigger } from 'fumadocs-ui/layouts/docs';

const LOGO_SRC = process.env.NEXT_PUBLIC_LOGO_PATH || '/mev-logo.png';
const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE || 'MEV Wiki';

export function BrandMark() {
  return (
    <>
      <img
        alt={`${SITE_TITLE} logo`}
        style={{ aspectRatio: '1' }}
        fetchPriority="high"
        className="block dark:hidden object-contain size-8"
        src={LOGO_SRC}
        sizes="32px"
        width={32}
        height={32}
      />
      <img
        alt={`${SITE_TITLE} logo`}
        style={{ aspectRatio: '1' }}
        loading="lazy"
        fetchPriority="high"
        className="hidden dark:block object-contain size-8"
        src={LOGO_SRC}
        sizes="32px"
        width={32}
        height={32}
      />
      <div className="text-pretty line-clamp-2 tracking-tight max-w-[18ch] lg:max-w-[24ch] font-semibold ms-1 text-base/tight lg:text-lg/tight text-tint-strong theme-bold:text-header-link">
        {SITE_TITLE}
      </div>
    </>
  );
}

export function HeaderBranding() {
  return (
    <Navbar className="h-(--fd-nav-height) on-root:[--fd-nav-height:56px] md:on-root:[--fd-nav-height:0px] md:hidden">
      <div className="flex max-w-full min-w-0 shrink items-center justify-start gap-1.5 lg:gap-3">
        <SidebarTrigger
          type="button"
          aria-label="Open table of contents"
          className="button group/button inline-flex items-center gap-2 rounded-md straight-corners:rounded-none circular-corners:rounded-3xl border-tint hover:border-tint-hover disabled:border-tint depth-subtle:shadow-xs hover:depth-subtle:shadow-md focus-visible:depth-subtle:shadow-md active:depth-subtle:shadow-xs dark:shadow-tint-1 contrast-more:border-tint-12 contrast-more:hover:border-2 contrast-more:hover:border-tint-12 hover:depth-subtle:-translate-y-px focus-visible:depth-subtle:-translate-y-px data-[state=open]:depth-subtle:-translate-y-px active:depth-subtle:translate-y-0 transition-all grow-0 shrink-0 truncate max-w-full disabled:cursor-not-allowed disabled:translate-y-0! disabled:shadow-none! bg-transparent border-0 contrast-more:border shadow-none! translate-y-0! hover:text-tint-strong focus-visible:bg-tint-hover focus-visible:text-tint-strong data-[state=open]:bg-tint-hover data-[state=open]:text-tint-strong contrast-more:bg-tint-subtle disabled:text-tint/8 disabled:bg-transparent text-base font-semibold px-2 py-2 -ml-2 text-tint-strong theme-bold:text-header-link hover:bg-tint-hover hover:theme-bold:bg-header-link/3 page-no-toc:hidden lg:hidden"
        >
          <svg
            style={{
              maskImage:
                'url(https://ka-p.fontawesome.com/releases/v6.6.0/svgs/regular/bars.svg?v=2&token=a463935e93)',
              WebkitMaskImage:
                'url(https://ka-p.fontawesome.com/releases/v6.6.0/svgs/regular/bars.svg?v=2&token=a463935e93)',
              maskRepeat: 'no-repeat',
              WebkitMaskRepeat: 'no-repeat',
              maskPosition: 'center',
              WebkitMaskPosition: 'center',
              backgroundColor: 'currentColor',
            }}
            className="gb-icon button-leading-icon size-[1em] shrink-0"
          />
        </SidebarTrigger>
        <Link className="group/headerlogo min-w-0 shrink flex items-center" href="/">
          <BrandMark />
        </Link>
      </div>
      <div className="flex-1" />
      <SearchToggle className="p-2" hideIfDisabled />
    </Navbar>
  );
}

export default HeaderBranding;
