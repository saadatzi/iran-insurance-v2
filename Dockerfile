
# Rebuild the source code only when needed
FROM node:14
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build



# EXPOSE 3000
# Production image, copy all the files and run next


# CMD ["npm", "run","start:dev"]

# CMD ["npm", "start"]
CMD ["npm", "run", "start:prod"]