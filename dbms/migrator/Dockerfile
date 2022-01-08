# Use the official image as a parent image
FROM node:16.3.0-alpine

ENV NODE_ENV production

ENV TZ Africa/Nairobi

# Set the working directory
WORKDIR /app

# Copy the file from your host to your current location
COPY package.json ./

# Run the command inside your image filesystem

RUN npm i -g nodemon

RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

CMD ["nodemon", "bin/www"]
