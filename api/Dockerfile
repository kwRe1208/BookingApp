# Stage 1: Build API
# Set the base image
FROM node:alpine AS build-api

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

#RUN npm install -g nodemon
# Expose the port that the app runs on
EXPOSE 8800

# Define environment variables
# ENV NODE_ENV=production

# Start the application
CMD ["index.js"]
#CMD ["npm", "run", "dev"]