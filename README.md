# Visualiseur de Tokens

Application pédagogique interactive pour comprendre ce qu'est un **token** dans un modèle de langage (LLM).

Saisissez du texte et observez en temps réel comment il est découpé en tokens par le tokenizer d'OpenAI (`tiktoken`). Chaque token est mis en couleur, et un survol révèle ses détails techniques (ID, représentation hexadécimale, taille en bytes).

**Démo en ligne :** https://jlg-formation.github.io/tokenizer/

---

## Fonctionnalités

- Tokenisation en temps réel pendant la frappe
- Choix de l'encodage : `cl100k_base`, `o200k_base`, `p50k_base`, `r50k_base`
- Visualisation colorée des tokens (couleur dérivée du hash de l'ID)
- Tooltip au survol : ID, texte brut, taille en bytes, représentation hexadécimale
- Statistiques : nombre de tokens, de caractères, ratio caractères/token
- Interface entièrement en français

## Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm v9 ou supérieur

## Installation

```bash
git clone https://github.com/jlg-formation/tokenizer.git
cd tokenizer
npm install
```

## Développement

```bash
npm run dev
```

L'application est disponible sur [http://localhost:5173](http://localhost:5173).

## Build de production

```bash
npm run build
```

Les fichiers compilés sont générés dans le dossier `dist/`.

## Stack technique

| Outil | Rôle |
|---|---|
| [Vite](https://vite.dev/) | Bundler et serveur de développement |
| [React](https://react.dev/) | Interface utilisateur |
| [TypeScript](https://www.typescriptlang.org/) | Typage statique |
| [Tailwind CSS](https://tailwindcss.com/) | Styles utilitaires |
| [tiktoken](https://github.com/openai/tiktoken) | Tokenizer OpenAI (WASM) |

## Déploiement

L'application est déployée automatiquement sur GitHub Pages via GitHub Actions à chaque push sur `main`.
