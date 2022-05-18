FROM node:13-alpine

RUN apk upgrade

RUN apk add git docker openssh

RUN mkdir /root/app


# Docker working directory
WORKDIR /root/app

# Copy current directory to APP folder
COPY . .

# Then install the NPM module
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]