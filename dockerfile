FROM node
WORKDIR Backend70030
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["npm","start"]