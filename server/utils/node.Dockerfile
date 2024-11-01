# Dockerfile for Node.js
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY . .

# Install dependencies (if you have a package.json)
RUN npm install

# Default command to run when the container starts
CMD ["node", "main.js"]
