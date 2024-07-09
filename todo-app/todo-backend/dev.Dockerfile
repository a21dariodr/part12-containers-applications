FROM node:20
WORKDIR /usr/todoapp/backend
COPY . .
RUN npm ci
USER node
CMD npm start