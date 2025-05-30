FROM node:18
WORKDIR /app
COPY package*.json ./petshop/
WORKDIR /app/petshop
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "server.js"]
