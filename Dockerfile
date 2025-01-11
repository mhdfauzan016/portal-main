# Build stage
FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:16-slim
WORKDIR /app
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/package*.json ./
COPY --from=build-stage /app/server.js ./

RUN npm install --only=production

EXPOSE 3000
CMD ["node", "server.js"]