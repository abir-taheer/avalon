FROM library/node:18-alpine
RUN apk update && apk upgrade && apk add --no-cache git
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app
ENV NODE_ENV production
RUN yarn && yarn build
ENV PORT 80
EXPOSE 80
CMD [ "npm", "start" ]