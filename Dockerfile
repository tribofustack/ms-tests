FROM node:18.18.2-alpine

WORKDIR /usr/auth/api

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

CMD ["npm","run","start"]
