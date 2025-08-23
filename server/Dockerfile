# Use a Node.js base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory first
# This allows Docker to cache the npm install layer
COPY package*.json ./

# Install application dependencies. We use --legacy-peer-deps to handle
# common dependency conflicts that occur during development.
RUN npm install --legacy-peer-deps --force

# Copy the rest of the application source code
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port the app runs on
EXPOSE 5002

# Start the NestJS application in production mode
CMD [ "npm", "run", "start:prod" ]