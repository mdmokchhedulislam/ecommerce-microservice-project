
FROM node:18-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ENV NODE_ENV=production

EXPOSE 3000


CMD ["node", "index.js"]
