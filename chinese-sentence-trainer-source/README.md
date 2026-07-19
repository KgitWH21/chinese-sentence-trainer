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

- `src/App.tsx` coordinates application state and challenge generation.
- `src/components/` contains the trainer controls, cards, recall UI, and feedback panels.
- `src/data/content.ts` contains the level-based prompt collections.
- `src/data/chengyu.ts` contains the annotated Chengyu catalog.
- `src/data/registers.ts` contains register guidance.
- `src/lib/validation.ts` contains the non-AI sentence checker.
- `src/lib/chinese.ts` handles simplified/traditional conversion.
- `src/lib/types.ts` defines the shared data model.
- `src/index.css` contains the full responsive visual design.
- `src/main.tsx` mounts the app; `index.html` is the Vite entry point.

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

Output is a static site in `dist/`. Preview it locally with `npm run preview`.

## Deploy to Vercel

This is a standard Vite + React + TypeScript static site.

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

No environment variables, database, or server runtime are required.

## Content note

The Advanced pool combines formal modern Chinese with modern literary and essay prose. Literary entries are marked `Literary prose · 文学表达` or `Literary diction · 文学用语`. They are not intended as a full Classical Chinese (文言文) curriculum.
