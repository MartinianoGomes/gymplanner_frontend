# GymPlanner — Frontend

Frontend do projeto GymPlanner: SPA em React + TypeScript usando Vite.

Este repositório contém a interface do usuário construída com React 19 e Vite, empacotada com um Dockerfile multi-stage para produção.

**Principais tecnologias**
- React 19
- TypeScript
- Vite
- ESLint

**Status**: template/projeto em desenvolvimento

## Começando (desenvolvimento)

Pré-requisitos:
- Node.js (recomendado: 18+)
- npm

Instalar dependências e iniciar em modo dev:

```bash
npm ci
npm run dev
```

O Vite iniciará o servidor de desenvolvimento (HMR). Acesse normalmente em `http://localhost:5173` (ou porta mostrada no terminal).

## Scripts úteis

- `npm run dev` - Inicia o servidor de desenvolvimento Vite.
- `npm run build` - Roda `tsc --noEmit` e gera a build do Vite em `dist`.
- `npm run preview` - Faz preview da build localmente com Vite.
- `npm run lint` - Executa o ESLint no projeto.
- `npm run docker` - Atalho para `docker compose up --build` (conforme `package.json`).

## Build e execução em produção (Docker)

O repositório contém um `Dockerfile` multi-stage e um `docker-compose.yml` para facilitar o deploy.

Build e subir com Docker Compose:

```bash
docker compose up --build
```

O serviço expõe a porta `8080` (mapeada para a mesma porta no host pelo `docker-compose.yml`).

Variáveis de ambiente suportadas (no `docker-compose.yml` ou ambiente do container):
- `HOST` (padrão sugerido: `0.0.0.0`)
- `PORT` (padrão: `8080`)

No `Dockerfile` é usado `serve` para servir os arquivos estáticos gerados em `dist`.

## Estrutura do projeto

- `src/` — código fonte React (componentes, estilos, entradas).
- `public/` — ativos estáticos públicos.
- `index.html` — entrada principal do Vite.
- `vite.config.ts` — configuração do Vite.
- `tsconfig.*.json` — configurações do TypeScript.
- `Dockerfile`, `docker-compose.yml` — containers e composição.

## Observações sobre ESLint/TypeScript

O projeto já inclui dependências de desenvolvimento para ESLint e TypeScript. Ajuste as regras em `eslint.config.js` e os `tsconfig` conforme as necessidades do seu fluxo.

## Como contribuir

- Abra issues para bugs ou sugestões.
- Para mudanças maiores, prefira criar uma branch e abrir um pull request.

## Executando localmente (resumo rápido)

Desenvolvimento:
```bash
npm ci
npm run dev
```

Build para produção:
```bash
npm run build
npm run preview
```

Com Docker:
```bash
docker compose up --build
```
