FROM node:22-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
COPY apps/lab-interactif/package.json apps/lab-interactif/package-lock.json ./apps/lab-interactif/
RUN npm install --no-audit --no-fund && npm install --no-audit --no-fund --prefix apps/lab-interactif

FROM base AS build
ARG PUBLIC_SITE_URL=https://www.lelectronrare.fr
ENV PUBLIC_SITE_URL=${PUBLIC_SITE_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/lab-interactif/node_modules ./apps/lab-interactif/node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD ["node", "dist/server/entry.mjs"]
