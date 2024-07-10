FROM node:20
WORKDIR /usr/todoapp/frontend
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]