FROM node:10-alpine

RUN mkdir /usr/local/app
WORKDIR /usr/local/app

ENV PATH /usr/local/app/node_modules/.bin:$PATH
COPY package.json /usr/local/app/package.json
RUN npm install

COPY . /usr/local/app
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "serve"]