# Base image with Node.js 20.17.0 on Alpine Linux
FROM node:20.17.0-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./

# Install npm version 10.8.2 explicitly
RUN npm install -g npm@10.8.2

# Install dependencies, ignoring peer dependency conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Production Stage ----
FROM node:20.17.0-alpine AS runner

WORKDIR /app


RUN node -v
RUN npm -v


COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/public public
COPY --from=builder /app/package.json package.json


EXPOSE 3000


ENV NODE_ENV=production


CMD ["npm", "run", "start"]
