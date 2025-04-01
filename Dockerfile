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

# Etapa 2: Servir la aplicación sin Nginx, directamente con un servidor HTTP simple
FROM node:20-alpine

# Instalar un servidor HTTP simple como 'http-server' para servir archivos estáticos
RUN npm install -g http-server

WORKDIR /usr/src/app

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Exponer el puerto 8080 para el servidor HTTP
EXPOSE 8080

# Comando para iniciar el servidor HTTP
CMD ["http-server", "/usr/share/nginx/html", "-p", "8080"]
