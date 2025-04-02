FROM node:20-alpine

WORKDIR /usr/src/app
COPY . .

# Instalar dependencias antes de ejecutar la construcción
RUN npm install

RUN npm install -g @quasar/cli --no-cache

# Ejecutar la construcción
RUN quasar build --verbose

# Instalar y usar un servidor estático
RUN npm install -g serve
CMD ["serve", "-s", "dist/spa", "-l", "8080"]
