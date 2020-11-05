FROM node:10.17.0-buster-slim

RUN mkdir /app
WORKDIR /app

COPY ./app/ /app

RUN npm install
RUN npm run build
RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build"]
