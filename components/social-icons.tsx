"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  FaDiscord,
  FaGithub,
  FaMedium,
  FaTelegramPlane,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';

type SocialIconsProps = {
  className?: string;
};

const links = {
  twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://ata.ws/twitter',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://ata.ws/telegram',
  discord: process.env.NEXT_PUBLIC_DISCORD_URL || 'https://ata.ws/discord',
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://ata.ws/github',
  medium: process.env.NEXT_PUBLIC_MEDIUM_URL || 'https://blog.ata.network/',
};

function SocialIconsGroup({ className }: SocialIconsProps) {
  return (
    <div className={`social-group ${className ?? ''}`}>
      <a href={links.twitter} aria-label="Twitter" target="_blank" rel="noreferrer">
        <FaXTwitter />
      </a>
      <a href={links.telegram} aria-label="Telegram" target="_blank" rel="noreferrer">
        <FaTelegramPlane />
      </a>
      <a href={links.discord} aria-label="Discord" target="_blank" rel="noreferrer">
        <FaDiscord />
      </a>
      <a href={links.github} aria-label="GitHub" target="_blank" rel="noreferrer">
        <FaGithub />
      </a>
      <a href={links.medium} aria-label="Medium" target="_blank" rel="noreferrer">
        <FaMedium />
      </a>
    </div>
  );
}

export default function SocialIcons({ className }: SocialIconsProps) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    let node: HTMLElement | null = null;
    let attempts = 0;
    const attach = () => {
      const tocInner = document.querySelector('#nd-toc > div');
      const toc = (tocInner || document.getElementById('nd-toc')) as HTMLElement | null;
      if (!toc) return false;
      // clear any existing wrapper we mounted before
      const existing = toc.querySelector('.social-group-wrapper');
      if (existing) {
        setSlot(existing as HTMLElement);
        return true;
      }
      node = document.createElement('div');
      node.className = 'social-group-wrapper';
      toc.appendChild(node);
      setSlot(node);
      return true;
    };

    // try immediately, then retry a few times if TOC not ready
    if (!attach()) {
      const interval = setInterval(() => {
        attempts += 1;
        if (attach() || attempts > 10) {
          clearInterval(interval);
        }
      }, 50);
      return () => {
        clearInterval(interval);
        if (node?.parentElement) node.parentElement.removeChild(node);
      };
    }

    return () => {
      if (node?.parentElement) node.parentElement.removeChild(node);
    };
  }, [pathname]);

  if (!slot) return null;
  return createPortal(<SocialIconsGroup className={className} />, slot);
}
