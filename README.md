# MEV Wiki

Welcome to the MEV Wiki. A comprehensive resource for understanding MEV (Maximal Extractable Value) on Ethereum and other blockchains.

🌐 **Live Site:** [https://www.mev.wiki/](https://www.mev.wiki/)

[![Built with Next.js](https://img.shields.io/badge/Next.js-16-black)]()
[![Fumadocs](https://img.shields.io/badge/Fumadocs-16-blue)]()
[![License](https://img.shields.io/badge/license-MIT-green)]()

## ✨ Features

- 🚀 **Modern Stack** - Next.js 16, React 19, TypeScript 5
- 🔍 **Full-Text Search** - Powerful built-in search functionality
- 📱 **Responsive Design** - Beautiful on all devices
- 🌓 **Dark Mode** - Automatic theme switching
- 📝 **MDX Support** - Rich content with React components
- 🎨 **Customizable** - Easy branding and theming
- ⚡ **Fast** - Optimized for performance
- ♿ **Accessible** - WCAG compliant

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone this template
git clone https://github.com/your-org/docs-template.git
cd docs-template

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env

# Edit .env with your site details
# (See Configuration section below)

# Run development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your documentation site.

## ⚙️ Configuration

### 1. Environment Variables

Edit `.env` to customize the site:

```bash
# Site configuration
NEXT_PUBLIC_SITE_URL=https://www.mev.wiki/
NEXT_PUBLIC_SITE_TITLE=MEV Wiki
NEXT_PUBLIC_SITE_DESCRIPTION=Welcome to the MEV Wiki.

# Social links
NEXT_PUBLIC_TWITTER_URL=https://ata.ws/twitter
NEXT_PUBLIC_GITHUB_URL=https://ata.ws/github
```

**Default Values:** The site comes pre-configured with MEV Wiki branding. You can override these via environment variables.

See [`.env.example`](.env.example) for all available configuration options.

### 2. Add Your Logo

Replace `/public/icon.png` with your logo (512x512px recommended).

Or set a custom path:
```bash
NEXT_PUBLIC_LOGO_PATH=/your-logo.png
```

### 3. Customize Colors

Edit `app/global.css` to change the primary color:

```css
@theme {
  --color-primary: #3b82f6; /* Your brand color */
}
```

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed customization guide.

## 📝 Writing Documentation

### Creating Pages

1. Create a new `.mdx` file in `content/docs/`:

```mdx
---
title: My Page
description: A helpful description
---

# My Page

Your content here with **Markdown** formatting.
```

2. Add to navigation in `content/docs/meta.json`:

```json
{
  "pages": ["index", "my-page"]
}
```

### Documentation Structure

```
content/docs/
├── index.mdx              # Home page
├── meta.json              # Navigation structure
└── getting-started/       # Documentation sections
    ├── index.mdx
    ├── installation.mdx
    ├── configuration.mdx
    └── meta.json
```

### MDX Features

- **Standard Markdown** - Headings, lists, links, images
- **Code blocks** with syntax highlighting
- **React components** - Use any component in your docs
- **Callouts** - Info, warning, success boxes
- **Image zoom** - Click to enlarge images
- **Mermaid diagrams** - Flowcharts and diagrams

See the included example pages for more.

## 🏗️ Building for Production

```bash
# Create production build
pnpm build

# Test production build locally
pnpm start
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

Or via CLI:
```bash
pnpm dlx vercel
```

### Other Platforms

This template works with:
- **Netlify** - Drop-in deployment
- **Cloudflare Pages** - Zero-config deployment
- **Railway** - Docker or Nixpacks
- Any Node.js hosting platform

### Deploy to GitHub Pages

GitHub Pages needs a static export and a base path that matches your repository.

1) Set environment variables (example for `username/mev-wiki`):
```
NEXT_PUBLIC_BASE_PATH=/mev-wiki
NEXT_PUBLIC_SITE_URL=https://username.github.io/mev-wiki/
NEXT_PUBLIC_GITHUB_PAGES=true
NEXT_EXPORT=true
```

2) Build the static site (outputs to `./out`):
```
NEXT_EXPORT=true pnpm run build
```

3) Publish the `out/` directory to your `gh-pages` branch (or use the GitHub Pages GitHub Action to upload that folder as the artifact).

## 📂 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── global.css         # Global styles and theme
│   └── docs/              # Documentation pages
├── components/            # React components
│   ├── header-branding.tsx
│   └── social-icons.tsx
├── content/docs/          # MDX documentation files
│   ├── index.mdx
│   └── meta.json
├── lib/                   # Utilities and config
├── public/                # Static assets
│   └── icon.png          # Your logo
├── .env.example          # Environment variables template
└── CUSTOMIZATION.md      # Detailed customization guide
```

## 🎨 Customization

For detailed customization options, see [CUSTOMIZATION.md](CUSTOMIZATION.md).

Quick links:
- [Changing colors](CUSTOMIZATION.md#colors--styling)
- [Adding social links](CUSTOMIZATION.md#social-links)
- [Modifying navigation](CUSTOMIZATION.md#navigation)
- [Custom components](CUSTOMIZATION.md#custom-components)

## 🛠️ Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # TypeScript type checking
```

## 🧩 Tech Stack

- **[Next.js 16](https://nextjs.org/)** - React framework
- **[Fumadocs](https://fumadocs.vercel.app)** - Documentation framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[MDX](https://mdxjs.com/)** - Markdown with components

## 📖 Docs

- **Getting Started** - See example content in `content/docs/getting-started/`
- **Customization** - Read [CUSTOMIZATION.md](CUSTOMIZATION.md)
- **Fumadocs Docs** - https://fumadocs.vercel.app
- **Next.js Docs** - https://nextjs.org/docs

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This template is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋 Support

- **Issues** - [GitHub Issues](https://github.com/your-org/docs-template/issues)
- **Discussions** - [GitHub Discussions](https://github.com/your-org/docs-template/discussions)

---

**Happy documenting!** 📚
