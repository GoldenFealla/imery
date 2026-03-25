# Build stage
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration=production

# Serve stage
FROM nginx:alpine

COPY --from=build /app/dist/image-processing-frontend/browser /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf