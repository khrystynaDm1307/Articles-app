FROM node:16-alpine
ENV SERVER_URL http://localhost:4000
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm", "start" ]