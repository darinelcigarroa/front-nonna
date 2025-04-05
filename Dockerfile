# Usa una imagen de Node.js con Alpine
FROM node:20-alpine AS build

WORKDIR /usr/src/app
COPY . .

# Define las variables de entorno y pásalas al contenedor
ARG VITE_API_BASE_URL
ARG VITE_REVERB_APP_KEY
ARG VITE_REVERB_HOST
ARG VITE_REVERB_PORT
ARG VITE_REVERB_SCHEME
ARG VITE_REVERB_APP_CLUSTER

# Establecer las variables de entorno en el contenedor
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_REVERB_APP_KEY=${VITE_REVERB_APP_KEY}
ENV VITE_REVERB_HOST=${VITE_REVERB_HOST}
ENV VITE_REVERB_PORT=${VITE_REVERB_PORT}
ENV VITE_REVERB_SCHEME=${VITE_REVERB_SCHEME}
ENV VITE_REVERB_APP_CLUSTER=${VITE_REVERB_APP_CLUSTER}

# Instalar dependencias
RUN npm install
RUN npm install -g @quasar/cli --no-cache

# Construir la aplicación
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
