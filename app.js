require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();


require ('dotenv').config
const expressFileUpload = require ('express-fileupload')
const cloudinary = require ('cloudinary').v2
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUD_API_KEY,
  api_secret:process.env.CLOUD_API_SECRET

})
// database
const connectDB = require('./db/connect');

const router = require ('./routes/productRoutes')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json())
app.use(express.static('./public'))
app.use(expressFileUpload({useTempFiles:true}))
app.use('/api/v1/products',router)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//app.use(expressFileUpload())
//app.use (cloudinary())

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
