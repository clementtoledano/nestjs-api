FROM node:13-alpine

#RUN apk upgrade

#RUN apk add git docker openssh

RUN mkdir /root/app

# Docker working directory
WORKDIR /root/app

COPY package*.json ./

# Then install the NPM module
RUN npm install

# Copy current directory to APP folder
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]