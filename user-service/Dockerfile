# Stage 1: Build Stage
FROM node:18-slim AS builder

WORKDIR /app

COPY package*.json ./


# RUN npm ci --only=production

COPY . .

# Stage 2: Production Stage
FROM node:18-slim

WORKDIR /app


COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app ./

# ENV NODE_ENV=production


EXPOSE 3000

RUN npm install -g tini
ENTRYPOINT ["tini", "--"]

CMD ["node", "index.js"]
