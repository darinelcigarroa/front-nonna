# Etapa 1: Construcción de la aplicación Quasar
FROM node:20-alpine as builder

WORKDIR /usr/src/app

# Copiar los archivos de configuración de dependencias
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código fuente de la aplicación
COPY . .

# Instalar Quasar CLI globalmente
RUN npm install -g @quasar/cli

# Construir la aplicación para producción
RUN quasar build

# Etapa 2: Servir la aplicación con http-server (sin Nginx)
FROM node:20-alpine

WORKDIR /usr/src/app

# Instalar http-server para servir los archivos estáticos
RUN npm install -g http-server

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /usr/src/app/dist/spa/ /usr/share/nginx/html/

# Exponer el puerto proporcionado por Railway
EXPOSE $PORT

# Comando para ejecutar http-server y servir la aplicación
CMD ["http-server", "/usr/share/nginx/html", "-p", "$PORT"]
