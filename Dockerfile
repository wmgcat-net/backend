FROM node:alpine AS build


COPY package.json .
RUN npm i
COPY . .
CMD ["npm run build"]

FROM node:alpine
COPY --from=build dist/index.min.cjs ./
COPY --from=build openapi.yml ./
CMD ["node", "index.min.cjs"]
