FROM node:20-alpine

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

# Instalar y usar un servidor estático
RUN npm install -g serve
CMD ["serve", "-s", "dist/spa", "-l", "8080"]

