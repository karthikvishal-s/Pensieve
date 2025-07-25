import express from "express";
import {PORT,mongoDBURL} from "./config.js"  // Importing the PORT constant from config.js
import mongoose from "mongoose"; // Importing mongoose for MongoDB object modeling

import booksRoute from "./routes/booksRoute.js" // Importing the booksRoute from booksRoute.js
import cors from 'cors'; // Importing cors for Cross-Origin Resource Sharing

const app=express();
app.use(cors({
    origin: 'https://thepensieve.vercel.app' // or 'http://localhost:3000' for development
  }));
app.use(express.json()); // Middleware to parse JSON request bodies

app.get('/',(req,res)=>{  //Creating a route for the root URL
   console.log(req); //Logging the request object to the console
   return res.status(200).send("Hello World"); //Sending a response with status code 234 and the message "Hello World"
});


app.use('/books',booksRoute)//Middleware to use the booksRoute for all requests to /books

//Middleware to enable CORS for all routes
 //Allowing all origins to access the resources

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT,()=>{   //.listen() method is used in express to bind and listen for connections on the specified host and port
            console.log(`Application is running on port ${PORT}`); //Callback function
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:",error.message); //Logging the error message if the connection fails
    });