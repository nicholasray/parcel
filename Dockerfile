FROM node:9.4

WORKDIR /var/www/parcel

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
