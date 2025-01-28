FROM node:20-alpine

RUN apk add --no-cache bash curl

RUN curl -sSL https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh -o /wait-for-it.sh && \
    chmod +x /wait-for-it.sh

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["/wait-for-it.sh", "db:5432", "--", "sh", "-c", "npm run migrations:run && npm run start:prod"]