FROM node:8.12.0-alpine

COPY package.json /app/package.json

COPY package-lock.json /app/package-lock.json

COPY .babelrc /app/.babelrc

RUN npm i -g babel-cli

WORKDIR /app

RUN npm install

CMD ["npm", "start"]

EXPOSE 4000