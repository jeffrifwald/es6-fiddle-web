FROM node:12
LABEL maintainer "Josh Ghent <me@joshghent.com>"

WORKDIR /app
COPY . /app
RUN npm install && npm run build
EXPOSE 3001
CMD ["node", "server/app.js"]
