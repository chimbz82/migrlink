FROM node:20-alpine AS base
WORKDIR /app

# Enable corepack and setup Monorepo build
RUN corepack enable

COPY . .

# Build and start command goes here
CMD ["npm", "run", "start"]
