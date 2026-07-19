# Chinese Sentence Trainer

An interactive constraint-based Chinese writing trainer with three difficulty levels, seven writing registers, recall mode, simplified/traditional conversion, deterministic sentence checking, and a curated 30-entry Chengyu collection.

## Run locally

Requirements: Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Open the local address printed in the terminal.

## Main files

- `app/page.tsx` coordinates application state and challenge generation.
- `app/components/` contains the trainer controls, cards, recall UI, and feedback panels.
- `app/data/content.ts` contains the level-based prompt collections.
- `app/data/chengyu.ts` contains the annotated Chengyu catalog.
- `app/data/registers.ts` contains register guidance.
- `app/lib/validation.ts` contains the non-AI sentence checker.
- `app/lib/chinese.ts` handles simplified/traditional conversion.
- `app/lib/types.ts` defines the shared data model.
- `app/globals.css` contains the full responsive visual design.
- `app/layout.tsx` contains page metadata and the document shell.

The trainer has no database, AI, or external runtime API dependency. Exercises are stored as typed local data, making it straightforward to add vocabulary, constructions, registers, or Chengyu.

## Put it on GitHub

Create an empty repository on GitHub, then run these commands inside this folder:

```bash
git init
git add .
git commit -m "Initial Chinese Sentence Trainer"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If the folder is already a Git repository, skip `git init` and replace the existing `origin` remote with your own repository URL.

## Production build

```bash
npm run build
```

This codebase uses React, TypeScript, Tailwind CSS, Vite, and Vinext. It is configured for the ChatGPT Sites/Cloudflare runtime. If you want to deploy through a different host, you may need to adapt the Vinext/Cloudflare build configuration to that host.

## Content note

The Advanced pool combines formal modern Chinese with modern literary and essay prose. Literary entries are marked `Literary prose · 文学表达` or `Literary diction · 文学用语`. They are not intended as a full Classical Chinese (文言文) curriculum.
