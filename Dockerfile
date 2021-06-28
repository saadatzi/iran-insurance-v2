
# Rebuild the source code only when needed
FROM node:14-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN ls


# Production image, copy all the files and run next



CMD ["npm", "start"]