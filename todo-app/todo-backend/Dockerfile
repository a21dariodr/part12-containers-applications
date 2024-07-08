FROM node:20

WORKDIR /usr/todoapp/backend

COPY --chown=node:node . .

RUN npm ci

USER node

CMD npm start