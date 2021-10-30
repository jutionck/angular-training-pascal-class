FROM node:lts as angular-build

WORKDIR /app

COPY ./src ./src
COPY ./*.json .
COPY ./*.js .
COPY ./.browserslistrc .

RUN npm i
RUN npm run build:prod

FROM nginx

WORKDIR /usr/share/nginx/html

WORKDIR /etc/nginx/conf.d

COPY ./nginx/default.conf .

COPY --from=angular-build /app/dist .

EXPOSE 80
