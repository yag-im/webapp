FROM node:20-bookworm-slim

RUN mkdir -p /opt/yag/webapp

WORKDIR /opt/yag/webapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80

CMD npm run start
