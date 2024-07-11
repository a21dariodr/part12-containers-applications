FROM node:20
WORKDIR /usr/patientor/frontend
COPY . .
RUN npm install
CMD ["npm", "run", "dev", "--", "--host"]