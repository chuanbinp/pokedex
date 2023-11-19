# Stage 1: Build the Next.js application
FROM node:18-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Create a minimal image to run the application
FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/next.config.js ./next.config.js

# Expose port 3000
EXPOSE 3000

# Set the environment variable for production
ENV NODE_ENV=production

# Start the Next.js application
CMD ["npm", "start"]