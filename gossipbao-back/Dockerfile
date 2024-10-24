FROM node:21-alpine

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm i

COPY . .

RUN pnpm build

CMD ["pnpm", "start"]