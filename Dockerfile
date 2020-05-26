# BUILD STAGE
FROM node:12.2.0-alpine AS builder
WORKDIR /app
COPY package.json .
COPY yarn.lock .
ENV NODE_ENV=production
ENV PORT=3977
ENV DB_HOST='mongodb://localhost:27017/news'
RUN npm install -g yarn
RUN yarn install
COPY . .
RUN yarn start
# DEPLOY STAGE
EXPOSE 3977
CMD ["node", "index.js"]
