# Use an official base image (e.g., Node.js for a React app or Python for a Django app)
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./

RUN npm install

# Copy the entire project folder to the container
COPY . .

# Expose the port the app runs on (for example, 3000 for React or Express apps)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
