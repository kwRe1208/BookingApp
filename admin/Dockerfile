# Stage 2: Build Client
FROM node:alpine AS build-admin

# Set the working directory for the client
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install client dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Define environment variables
#ENV NODE_ENV=production

# Start the application
CMD ["npm", "start"]
