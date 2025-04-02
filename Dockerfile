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

# Etapa 2: Servir la aplicación con http-server
FROM node:20-alpine

WORKDIR /usr/src/app

# Instalar http-server para servir los archivos estáticos
RUN npm install -g http-server

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Exponer el puerto proporcionado por Railway
EXPOSE $PORT

# Comando para ejecutar http-server y servir la aplicación
CMD ["http-server", "/usr/share/nginx/html", "-p", "$PORT"]
