FROM node:14-alpine

RUN mkdir /usr/app
WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE 8098
ENTRYPOINT  [ "node", "dist/shared/infra/http/server.js" ]
