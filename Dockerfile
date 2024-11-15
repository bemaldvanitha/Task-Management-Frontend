FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

COPY public/ public/

COPY src/ src/

ARG REACT_APP_BACKEND_URL

ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}

RUN npm ci

RUN npm run build

FROM nginx:1.23.2-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

RUN touch /var/run/nginx.pid

RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

USER nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]