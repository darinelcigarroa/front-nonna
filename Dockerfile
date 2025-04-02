FROM node:20-alpine

WORKDIR /usr/src/app
COPY . .

RUN npm install -g @quasar/cli --no-cache

# RUN quasar clean
RUN quasar build


# Instalar y usar un servidor estático
RUN npm install -g serve
CMD ["serve", "-s", "dist/spa", "-l", "8080"]

