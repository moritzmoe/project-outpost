FROM node:12-buster
WORKDIR /app
ENV NODE_ENV="production"
COPY package.json ./
RUN npm install --dev
COPY . ./
RUN npm run build

CMD ["npm", "run", "start"]
