# Use a lightweight Node.js image https://hub.docker.com/_/node 
FROM node:22-alpine

# Set working directory
WORKDIR /src

# Set environment variables
ENV NODE_ENV="production"

# Copy package*.json and .env dependencies
COPY package*.json ./
COPY .env.template ./.env

# Rename config.template.js to config.js
COPY ./app/src/config.template.js ./app/src/config.js

# Install necessary system packages
RUN apk add --no-cache bash vim

# Install Node.js dependencies (retry up to 3 times to handle intermittent QEMU crashes in cross-platform builds)
RUN for i in 1 2 3; do npm ci --only=production --silent && break || echo "Retry $i..."; done \
    && npm cache clean --force \
    && rm -rf /tmp/* /var/tmp/* /usr/share/doc/*

# Copy the application code
COPY app app
COPY public public

# Set default command to start the application
CMD ["npm", "start"]