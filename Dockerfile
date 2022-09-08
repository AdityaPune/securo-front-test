FROM node:14 as build

WORKDIR /frontend
COPY . /frontend

RUN npm install
RUN npm run build

FROM nginx:alpine

COPY --from=build /frontend/build /usr/share/nginx/html
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]