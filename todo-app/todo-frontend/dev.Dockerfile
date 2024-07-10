FROM node:20
WORKDIR /usr/todoapp/frontend
COPY . .
RUN npm install
ENV VITE_BACKEND_URL=http://localhost:3000/
CMD ["npm", "run", "dev", "--", "--host"]