FROM node:20-alpine

# 1. Enable Corepack to use the pnpm version defined in your package.json
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# 2. Copy only lockfile and package.json first for better caching
COPY pnpm-lock.yaml package.json ./

# 3. Use pnpm install (frozen-lockfile ensures it matches your local dev exactly)
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

# 4. Use pnpm to start the app
CMD ["pnpm", "start"]