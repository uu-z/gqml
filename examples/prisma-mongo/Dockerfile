FROM node:alpine as build
WORKDIR /app
COPY package.json ./
RUN yarn install --prod
COPY . .
FROM node:alpine
COPY --from=build /app /
EXPOSE 8082
CMD ["npm", "start"]
