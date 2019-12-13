FROM node:latest as client

WORKDIR /usr/app/client
COPY package.json yarn.lock ./
RUN yarn
COPY . .
