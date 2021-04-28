# photo-gallery

## Simple image gallery application for NodeJS.

### You need to create an .env file with the environment variables that store the credentials of a MongoDB Atlas database (in the MONGODB_URI string with the USER_NAME, PASSWORD, and DBNAME). Likewise, since the application stores the images in Cloudinary, it will be necessary to write the variables CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in this file. The last item serves to provide a subroute on the server. If the application is implemented on a Heroku-type server, it will be necessary to configure these environment variables.
```
PORT=xxxx
MONGODB_URI=mongodb+srv://xxxx:xxxx@cluster0.4temp.mongodb.net/xxxx?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
PREFIX_APP=/subroute-prefix
```
### In the latter case, it is not necessary to set the port or configure the prefix of the subroute in said .env file.
