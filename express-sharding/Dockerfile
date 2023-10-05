FROM node:16

WORKDIR /node-docker

# Node-fetch v3 has import issues
RUN npm install express node-fetch@2

COPY . .

CMD ["node", "app.js"]
