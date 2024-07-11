FROM node:20
WORKDIR /usr/patientor/backend
COPY --chown=node:node . .
RUN npm ci
USER node
CMD npm run tsc && npm start