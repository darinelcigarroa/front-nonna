FROM node:20-alpine

WORKDIR /usr/src/app
COPY . .

# Instalar dependencias antes de construir
RUN npm install
RUN npm install -g @quasar/cli --no-cache

# Pasar la variable de entorno directamente en el build
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN quasar build

# Instalar y usar un servidor estático
RUN npm install -g serve
CMD ["serve", "-s", "dist/spa", "-l", "8080"]
