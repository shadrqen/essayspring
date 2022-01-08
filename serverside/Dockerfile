# Use the official image as a parent image
FROM node:16.3.0-alpine

# Add tzdata
RUN apk add --no-cache tzdata

# Setting the default timezone
ENV TZ=Africa/Nairobi

# Setting the node environment
ENV NODE_ENV production

# Set the working directory
WORKDIR /app

# Copy the file from your host to your current location
COPY package.json ./

# Run the command inside your image filesystem
RUN npm install -g pm2

RUN npm install

#RUN npm install --save-dev sequelize-cli

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

RUN mkdir -p /static/uploads

RUN mkdir -p /static/logs

# Run the specified command within the container.
CMD ["pm2-runtime", "bin/www"]
