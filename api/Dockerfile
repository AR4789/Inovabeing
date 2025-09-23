FROM node:18-slim

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy the app code
COPY . .

# Allow dynamic PORT through build-arg or fallback to 4000
ARG PORT=4000
ENV PORT=${PORT}

# Expose the dynamic port
EXPOSE ${PORT}

# Start the app
CMD ["node", "src/index.js"]
