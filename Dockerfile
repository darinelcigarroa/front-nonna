# Usa una imagen de Nginx con Alpine
FROM node:20-alpine AS build

WORKDIR /usr/src/app
COPY . .

# Instalar dependencias
RUN npm install
RUN npm install -g @quasar/cli --no-cache

# Pasar la variable de entorno y construir
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN quasar build --verbose

# Segunda etapa: Servidor Nginx
FROM nginx:alpine

# Copiar el build de Quasar a la carpeta de Nginx
COPY --from=build /usr/src/app/dist/spa /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
