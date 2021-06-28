
# Rebuild the source code only when needed
FROM node:14
WORKDIR /app
COPY package.json .
COPY . .
RUN npm install
RUN ls

EXPOSE 3000
# Production image, copy all the files and run next


# CMD ["npm", "run","start:dev"]

CMD ["npm", "start"]