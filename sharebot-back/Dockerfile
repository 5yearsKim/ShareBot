# Stage 1: Build
FROM node:21-alpine AS build

WORKDIR /app

# Enable corepack and install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package and lock files to install dependencies
COPY pnpm-lock.yaml package.json ./

# Install dependencies and build the project
RUN pnpm install
COPY . .
RUN pnpm build

# Stage 2: Production
FROM node:21-alpine AS runner

WORKDIR /app

# Enable corepack and install pnpm for the production stage
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package and lock files to install production dependencies only
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --prod

# Copy the built application from the build stage
COPY --from=build /app/dist ./dist

EXPOSE 6020

# Run the application
CMD ["pnpm", "serve-apis"]
