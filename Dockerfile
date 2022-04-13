FROM node:latest

#Install node_modules
CMD ["npm", "install"]
#Copy all the files from the project's root to /usr/swaggerDocs
COPY . .
COPY index.js .
CMD ["node", "index.js"]
