FROM node

WORKDIR /app/client/build

COPY ./client/build ./

WORKDIR /app/server

COPY ./server .

RUN npm install

ENV PORT=$PORT

CMD ["npm", "run", "start"]