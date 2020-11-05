FROM node:14.15.0-buster AS builder

RUN apt-get update
RUN apt-get install -y python3-dev build-essential make

RUN mkdir /app
WORKDIR /app

COPY ./app/ /app

RUN npm install
RUN npm run build

FROM node:14.15.0-buster-slim

RUN mkdir /app
WORKDIR /app
COPY --from=builder /app/ .

RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build"]
