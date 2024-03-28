FROM node:14

ARG UID
ARG GID
ARG PORT
ARG NODE_ENV

ENV NODE_ENV=${NODE_ENV}

RUN yarn global add pm2

RUN groupmod -o -g ${GID} node && usermod -o -u ${UID} -g node node

RUN touch /var/log/lock.log

WORKDIR /var/www/backend

USER node

EXPOSE ${PORT}

CMD pm2 start && tail -f /var/log/lock.log
