# Meiji — Case Files (E-Portfolio)

My e-portfolio built with **Jekyll** on GitHub Pages. Content is managed through markdown files with YAML frontmatter — no HTML duplication needed.

Design was made by claude

**Live Site:** `https://yourusername.github.io/me1ji` (update after deploying)

## Quick Start

### Local Development
```bash
bundle install
bundle exec jekyll serve
# Visit http://localhost:4000
```

### Deploy
Push to GitHub — GitHub Actions automatically builds and deploys to GitHub Pages:
```bash
git add .
git commit -m "Add/update content"
git push origin main
```

---

## File Structure

```
me1ji/
├── _collections/              ← Content organized by type
│   ├── projects/              ← Project markdown files
│   ├── challenges/            ← Challenge markdown files
│   ├── writeups/              ← Writeup & note markdown files
│   └── certificates/          ← Certificate markdown files
├── _config.yml                ← Site settings (title, URL, collections config)
├── _includes/                 ← Reusable HTML components
│   ├── header.html            ← Navigation & branding
│   ├── footer.html            ← Footer
│   └── card.html              ← Card template for items
├── _layouts/                  ← Page templates
│   ├── default.html           ← Base layout (header + content + footer)
│   ├── collection.html        ← Collection index pages
│   └── collection-item.html   ← Individual item pages
├── pages/                     ← Top-level markdown pages
│   ├── projects.md            → generates /projects/
│   ├── challenges.md          → generates /challenges/
│   ├── writeups.md            → generates /writeups/
│   ├── certificates.md        → generates /certificates/
│   └── contact.md             → generates /contact/
├── index.md                   ← Home page
├── assets/                    ← CSS, JS, images (unchanged)
│   ├── css/site.css
│   ├── js/site.js
│   └── images/
├── Gemfile                    ← Ruby dependencies
├── .github/workflows/jekyll.yml  ← GitHub Actions build config
└── .gitignore
```

---

## Adding Content

### Add a New Project

Create `_collections/projects/my-project.md`:

```yaml
---
id: my-project
caseId: DEV-2026-005
title: "My Awesome Project"
meta: "Where built, context"
summary: "One-liner description for the card"
tools: ["Tag1", "Tag2", "Tag3"]
stamp: solved              # or: open, classified
stampLabel: Solved         # Display label
---

## Overview
Project description...

## Proof of Concept
- Step 1
- Step 2

## Findings
- Finding 1

## Downloads
- [File](downloads/file.zip)
```

### Add Images to a Project

Put image files under `assets/images/`, then reference them from the markdown using either plain markdown or the built-in `.image-wrap` wrapper.

Example (markdown image):

```md
## Overview

![Project screenshot](/assets/images/projects/dev-2025-014/screenshot-01.png)
```

Example (responsive wrapper):

```md
<div class="image-wrap">
  <img src="/assets/images/projects/dev-2025-014/screenshot-01.png" alt="Secure login flow screenshot" />
</div>
```

You can also add direct download links:

```md
[Download screenshot](/assets/images/projects/dev-2025-014/screenshot-01.png)
```

**The page automatically:**
- Appears at `/projects/my-project/`
- Shows on `/projects/` collection page
- Uses the standard card layout
- Inherits header, footer, navigation

### Add to Other Collections

Same process for:
- **Challenges**: `_collections/challenges/my-challenge.md`
- **Writeups**: `_collections/writeups/my-writeup.md`
- **Certificates**: `_collections/certificates/my-cert.md`

### Add a New Top-Level Page

Create `pages/about.md`:

```yaml
---
layout: default
title: About Me
---

# Your content in markdown
```

Page appears at `/about/`

---

## Frontmatter Fields

| Field | Purpose | Example |
|-------|---------|---------|
| `id` | Unique identifier | `pen-2026-001` |
| `caseId` | Display ID on card | `PEN-2026-001` |
| `title` | Page/card title | `Kioptrix Level 1` |
| `meta` | Subtitle/context | `Group project, Section 3IT-1` |
| `summary` | One-liner for cards | `Exploited Samba 2.2.1a...` |
| `tools` | Tag array | `["CVE", "DREAD", "MITRE"]` |
| `stamp` | Status marker | `solved`, `open`, `classified` | 
| `stampLabel` | Display text | `Solved`, `Playable`, `Ongoing` |

---

## Customization

### Edit Site Config
Update `_config.yml`:
```yaml
title: Meiji — Case Files
author: Meiji
email: you@example.com
url: https://yourdomain.com
```

### Update Navigation
Edit `_includes/header.html` — links are hardcoded there.

### Change Footer
Edit `_includes/footer.html`

### Modify Card Layout
Edit `_includes/card.html`

### Change Collection Templates
Edit `_layouts/collection.html` for collection index pages  
Edit `_layouts/collection-item.html` for individual item pages

### Styling
All CSS is in `assets/css/site.css` — no changes needed for core functionality.

---

## GitHub Pages Setup

### Automatic (Already Configured)
Workflow file `.github/workflows/jekyll.yml` handles builds automatically:
- Watches `main` / `master` branches
- Builds on every push
- Deploys to GitHub Pages

### Enable in Repository Settings
1. Go to **Settings → Pages**
2. Set source to **GitHub Actions**
3. Custom domain (optional): Add `CNAME` file with your domain



## Useful Commands

```bash
# Install dependencies
bundle install

# Run locally
bundle exec jekyll serve

# Clean and rebuild
bundle exec jekyll clean && bundle exec jekyll build

# Check for build errors
bundle exec jekyll doctor
```

---

## Structure Details

### Collections
Each collection in `_collections/` is defined in `_config.yml`:
```yaml
collections:
  projects:
    output: true
    permalink: /projects/:name/
  challenges:
    output: true
    permalink: /challenges/:name/
  # ... etc
```

### Layouts
- `default.html` — Base layout (header → content → footer)
- `collection.html` — Index pages (loops through collection items, renders cards)
- `collection-item.html` — Individual item pages

### Includes
Small reusable components:
- `header.html` — Nav + branding
- `footer.html` — Footer
- `card.html` — Card template with variables

---

## Troubleshooting

**Site not updating locally?**
```bash
bundle exec jekyll clean
bundle exec jekyll serve
```

**GitHub Actions build failed?**
Check the Actions tab on GitHub for error logs. Common issues:
- Invalid YAML in frontmatter
- Missing required fields
- Ruby/gem version conflicts

**Collection not appearing?**
- File must be in `_collections/[collection-name]/`
- Collection must be defined in `_config.yml`
- Frontmatter must be valid YAML

---

## Resources

- [Full Setup Guide](JEKYLL_SETUP.md)
- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Markdown Syntax](https://www.markdownguide.org/cheat-sheet/)
- [GitHub Pages Docs](https://docs.github.com/en/pages)
