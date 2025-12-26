FROM node:alpine

COPY package.json .
RUN npm i
COPY dist/index.min.cjs ./

CMD ["node", "index.min.cjs"]