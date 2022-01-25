FROM node:16.13.2-alpine3.14

ARG NODE_ENV=production

WORKDIR /backend

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

USER node

CMD ["yarn", "start"]