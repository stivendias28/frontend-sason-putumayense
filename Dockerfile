From node:20.0.0
WORKDIR usr/src/frontend

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm","start"]
