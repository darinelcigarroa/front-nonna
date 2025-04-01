# Etapa 1: Construir la aplicación Quasar
FROM node:26-alpine

WORKDIR /usr/src/app

COPY package*.json package-lock.json ./

RUN apk update && apk add --no-cache linux-headers

RUN npm install

COPY . .

RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]