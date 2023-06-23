# Use the official Node.js LTS (Long Term Support) image as the base image
FROM mcr.microsoft.com/devcontainers/javascript-node:0-18-bullseye

RUN sudo apt update && sudo apt upgrade -y && apt install -y build-essential python2 && npm install -g npm nx yarn

# Set the working directory in the container
WORKDIR /app

COPY ./package.json ./yarn.lock ./tsconfig.base.json ./nx.json ./.eslintrc.json ./.eslintignore ./jest.config.ts ./jest.preset.js ./
COPY ./apps ./apps
COPY ./libs ./libs
COPY ./tools ./tools
COPY ./scripts ./scripts

# Build the application
RUN yarn install:all && yarn build:all

# Expose the desired port (e.g., 3000, 4200, or 8080)
EXPOSE 3000

# Start the application
CMD ["node", "./dist/apps/duality-social-node/main.js"]
