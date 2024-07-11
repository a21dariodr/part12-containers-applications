FROM node:20 AS build-stage
WORKDIR /usr/patientor/frontend
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=build-stage /usr/patientor/frontend/dist /usr/share/nginx/html