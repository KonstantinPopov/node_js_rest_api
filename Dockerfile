FROM node:8

WORKDIR /usr/src
ADD app/package.json /usr/src/package.json
#RUN npm init -y
RUN npm install nodemon -g
RUN npm install -g

# if use update: error: Cannot find module 'npmlog'
#RUN npm update -g
RUN npm -v

EXPOSE 3000
CMD npm start
USER node
