# Node.js Alpine runtime image
FROM node:20-alpine

WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source code
COPY . .

# Expose backend port
EXPOSE 5000

# Default environment configuration
ENV PORT=5000
ENV NODE_ENV=production

# Start Express REST API server
CMD ["node", "server.js"]
