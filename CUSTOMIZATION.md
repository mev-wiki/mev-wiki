# Customization Guide

This guide will help you customize this Automata Network documentation template for your specific project.

**Note:** This template comes pre-configured with Automata Network branding, social links, and default styling. You only need to customize project-specific details.

## Table of Contents

- [Quick Start](#quick-start)
- [Environment Variables](#environment-variables)
- [Branding](#branding)
- [Colors & Styling](#colors--styling)
- [Navigation](#navigation)
- [Social Links](#social-links)
- [Advanced Customization](#advanced-customization)

## Quick Start

1. Copy the environment variables template:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your project-specific details (title, description, repo name, etc.)
   - **Automata branding is already configured** - no need to change social links unless your project needs separate channels

3. Add your project logo to `/public/icon.png` (or keep the default Automata logo)

4. Start adding your project documentation in `content/docs/`

## Environment Variables

All major configuration is handled through environment variables. This makes it easy to customize without modifying code.

### Default Configuration (Already Set)

The template includes these Automata Network defaults:

```bash
# Site Configuration (customize for your project)
NEXT_PUBLIC_SITE_URL=https://docs.ata.network
NEXT_PUBLIC_SITE_TITLE=MEV Wiki
NEXT_PUBLIC_SITE_DESCRIPTION=Official Automata Network documentation
NEXT_PUBLIC_SITE_KEYWORDS=Automata,Automata Network,blockchain,TEE,attestation,documentation
NEXT_PUBLIC_TWITTER_HANDLE=@AutomataNetwork

# Branding
NEXT_PUBLIC_LOGO_PATH=/icon.png

# Automata Network Social Media Links (pre-configured)
NEXT_PUBLIC_TWITTER_URL=https://ata.ws/twitter
NEXT_PUBLIC_TELEGRAM_URL=https://ata.ws/telegram
NEXT_PUBLIC_DISCORD_URL=https://ata.ws/discord
NEXT_PUBLIC_GITHUB_URL=https://ata.ws/github
NEXT_PUBLIC_MEDIUM_URL=https://blog.ata.network/

# GitHub Integration (update repo name for your project)
NEXT_PUBLIC_GITHUB_OWNER=automata-network
NEXT_PUBLIC_GITHUB_REPO=your-project-repo
GITHUB_TOKEN=your-github-token-here
```

**What to Customize:**
- Site title and description for your specific project
- GitHub repo name
- Logo (if your project has a specific logo)
- Social links (only if your project needs separate channels)

## Branding

### Logo

1. **Create your logo:**
   - Recommended size: 512x512px
   - Format: PNG with transparency
   - Optimized file size

2. **Add to project:**
   ```bash
   cp your-logo.png public/icon.png
   ```

3. **Update environment variable (if using a different path):**
   ```bash
   NEXT_PUBLIC_LOGO_PATH=/your-custom-logo.png
   ```

### Favicon

The logo at `/public/icon.png` is automatically used as the favicon. Make sure it:
- Is square (1:1 aspect ratio)
- Works well at small sizes (16x16, 32x32)
- Has good contrast in both light and dark modes

## Colors & Styling

### Primary Color

Edit `app/global.css` to change the primary color:

```css
@theme {
  /* Find and update this line */
  --color-primary: oklch(62.8% 0.25768330773615683 29.2338851923426);

  /* Replace with your brand color */
  --color-primary: #3b82f6; /* Example: blue */
}
```

### Converting Colors

The theme uses OKLCH color space. To convert your hex color:

1. Go to https://oklch.com
2. Enter your hex color
3. Copy the OKLCH value
4. Update `app/global.css`

### Dark Mode

Dark mode is automatically supported. The template uses CSS variables that adapt to the user's theme preference.

To customize dark mode colors, edit the color definitions in `app/global.css`.

## Navigation

### Basic Navigation

Edit `content/docs/meta.json` to control the main navigation:

```json
{
  "title": "Documentation",
  "pages": [
    "index",
    "getting-started",
    "your-section",
    "another-section"
  ]
}
```

### Nested Navigation

For nested sections, create a `meta.json` in each subdirectory:

```
content/docs/
├── meta.json              # Root navigation
├── getting-started/
│   ├── meta.json         # Getting started section navigation
│   ├── index.mdx
│   └── installation.mdx
└── api/
    ├── meta.json         # API section navigation
    └── index.mdx
```

Example nested `meta.json`:

```json
{
  "title": "API Reference",
  "pages": [
    "index",
    "authentication",
    "endpoints"
  ]
}
```

## Social Links

Social icons appear by default in the table of contents sidebar, linking to official Automata Network channels:

- **Twitter (X)** - https://ata.ws/twitter
- **Telegram** - https://ata.ws/telegram
- **Discord** - https://ata.ws/discord
- **GitHub** - https://ata.ws/github
- **Medium** - https://blog.ata.network/

### Customizing Social Links (Optional)

**Most projects can use the default Automata Network social links.** Only override these if your project has dedicated community channels:

```bash
# Only set these if your project needs separate channels
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yourproject
NEXT_PUBLIC_GITHUB_URL=https://github.com/automata-network/yourproject
NEXT_PUBLIC_DISCORD_URL=https://discord.gg/yourproject
# ... etc
```

**Note:** If environment variables are not set, the official Automata Network links are used by default.

### Adding New Social Icons

To add a new social platform:

1. Install the icon package (if needed):
   ```bash
   pnpm add react-icons
   ```

2. Edit `components/social-icons.tsx`:
   ```tsx
   // Add your icon import
   import { FaYourPlatform } from 'react-icons/fa';

   // Add to links object
   const links = {
     // ... existing links
     yourplatform: process.env.NEXT_PUBLIC_YOURPLATFORM_URL || '',
   };

   // Add to component JSX
   {links.yourplatform && (
     <a href={links.yourplatform} aria-label="Your Platform" target="_blank" rel="noreferrer">
       <FaYourPlatform />
     </a>
   )}
   ```

## Advanced Customization

### Modifying Layouts

Layouts are defined in `lib/layout.shared.tsx`. You can customize:

- Sidebar behavior
- Header configuration
- Footer content
- Search settings

### Custom Components

Add custom React components to use in your MDX:

1. Create component in `components/`
2. Import in MDX files:
   ```mdx
   import { YourComponent } from '@/components/your-component'

   <YourComponent />
   ```

### Styling

The template uses:
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Variables** - For theming and dark mode
- **Fumadocs UI** - Pre-built documentation components

Global styles are in `app/global.css`.

### Analytics

The template includes Vercel Analytics. To remove or replace:

1. Edit `app/layout.tsx`
2. Remove or replace the `<Analytics />` component
3. Add your preferred analytics provider

### Custom Domain

For production deployment:

1. Update `NEXT_PUBLIC_SITE_URL` in `.env`
2. Configure your domain in your hosting platform
3. Update any hardcoded URLs in your content

## Troubleshooting

### Build Errors

If you get build errors after customization:

```bash
# Clear cache and rebuild
rm -rf .next
pnpm build
```

### Environment Variables Not Working

- Make sure `.env` is in the project root
- Restart the dev server after changing `.env`
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Don't commit `.env` (only `.env.example`)

### Logo Not Appearing

- Check the file path in `NEXT_PUBLIC_LOGO_PATH`
- Verify the file exists in `/public`
- Clear browser cache
- Check browser console for errors

## Need Help?

- **Fumadocs Documentation:** https://fumadocs.vercel.app
- **Next.js Documentation:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs

For template-specific issues, check the repository README or open an issue.
