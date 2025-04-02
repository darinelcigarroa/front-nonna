# Usa una imagen base de Node.js
FROM node:18-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Construye la aplicación
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

# Servidor para archivos estáticos
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
