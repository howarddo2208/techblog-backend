FROM node:16.14.2-alpine AS development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "start:dev"]

FROM node:16.14.2-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY . .

CMD ["npm", "run", "start:prod"]