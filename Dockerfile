FROM node:10

RUN npm i -g typescript ts-node nodemon

WORKDIR /var/www/astra_network
ADD package.json /var/www/astra_network
ADD yarn.lock /var/www/astra_network
RUN yarn install

ADD . /var/www/astra_network

EXPOSE 4000

CMD ["yarn start"]
