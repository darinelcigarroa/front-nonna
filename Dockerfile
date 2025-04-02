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

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa anterior al directorio de Nginx
COPY --from=builder /usr/src/app/dist/spa/ /usr/share/nginx/html/

# Copiar el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Ajustar los permisos para las carpetas y archivos
RUN chown -R nginx:nginx /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
