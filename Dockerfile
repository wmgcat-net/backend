FROM node:alpine

COPY package.json .
RUN npm i
COPY dist/index.min.cjs ./
COPY openapi.yml ./

CMD ["node", "index.min.cjs"]
