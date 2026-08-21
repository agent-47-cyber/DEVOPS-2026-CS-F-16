# Stage 1: Build the React / Vite SPA production bundle
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source files
COPY . .

# Build-time argument for API base URL
ARG VITE_API_URL=http://localhost:5000/api
ENV VITE_API_URL=$VITE_API_URL

# Build the production bundle into dist/
RUN npm run build

# Stage 2: Serve the production bundle using Node.js Alpine (locked syllabus stack)
FROM node:20-alpine

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm ci

# Copy compiled dist from builder stage
COPY --from=builder /app/dist ./dist

# Expose Vite preview port
EXPOSE 5173

ENV PORT=5173
ENV NODE_ENV=production

# Serve the static production build using standard Vite preview
CMD ["npm", "run", "preview"]
