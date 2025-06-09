FROM node:18
workdir /app
copy . .
run npm install --production
cmd ["npm" , "start"]