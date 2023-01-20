FROM node:16-alpine AS builder

WORKDIR /app

COPY . /app/

RUN npm install
RUN npm run build

##################################

FROM node:16-alpine

WORKDIR /app

COPY --from=builder /app/build .

RUN npm i serve -g

EXPOSE 3000

CMD ["serve","-s","build","-l","3000"]

