FROM node:14

WORKDIR /product

COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./src ./src

RUN npm run build

EXPOSE 3000

ENTRYPOINT  [ "npm", "run" ]