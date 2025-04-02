# Etapa 1: Construir la aplicación Quasar
FROM node:20-alpine as builder

WORKDIR /usr/src/app

# Copiar todo el código del proyecto primero
COPY . .

# Instalar dependencias
RUN apk add --no-cache linux-headers
RUN npm install

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
