FROM node:20
WORKDIR /usr/patientor/backend
COPY . .
RUN npm install
USER node
CMD npm run dev