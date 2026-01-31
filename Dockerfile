# Build stage
FROM node:20-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Ensure SvelteKit types and artifacts are generated
RUN npx svelte-kit sync

# Build the SvelteKit application
RUN npm run build

# Production stage
FROM node:20-slim AS runner

WORKDIR /app

# Copy the build output from the builder stage
# adapter-node defaults to the 'build' directory
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

# If you have external dependencies needed at runtime, install them here
# RUN npm ci --omit=dev

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start the server
CMD ["node", "build/index.js"]
