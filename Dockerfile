# Use lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose port for Cloud Run
EXPOSE 8080

# Start the production server
CMD ["npm", "start"]
