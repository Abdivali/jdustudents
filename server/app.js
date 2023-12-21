const UsersSChema=require ("./model/users")
const URL=require("./link")
const express = require("express");
const app = express();
require("dotenv").config();
const axios= require("axios")
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cookieParsier = require("cookie-parser");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
// const redis = require('./redis')

// const MongoURI = "mongodb://127.0.0.1:27017/jduloyiha";
const MongoURI= process.env.MONGODB_CONNECT_URI
// const MongoURI = "mongodb+srv://abdivalisharafov:JdIiT75EhCmRzZEd@myapp.1rvalii.mongodb.net/myapp?retryWrites=true&w=majority";
mongoose
    .connect(MongoURI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((res) => {
        console.log(`MongoDB Connected`);
    });

const store = new MongoDBSession({
    uri: MongoURI,
    collection: "MySession",
});

// Middlewares
app.use(cors());

// Time management
app.locals.moment = require("moment");

// JSON format
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParsier());

// Method Override
app.use(
    methodOverride("_method", {
        methods: ["POST", "GET"],
    })
);

// axios.get(URL.URLIT)
//   .then(response => {
//     // console.log(response)
//     const jsonData = response.data;
//     try {
//          UsersSChema.create(jsonData.data)
//         console.log('data successfully imported')
//         // to exit the process
        
//       } catch (error) {
//         console.log('error', error)
//       }
//     // console.log(jsonData.data[1]);cl
//   })
//   .catch(error => {
//     console.error('Error fetching JSON data:', error);
//   });
// axios.get(URL.URLDATA)
//   .then(response => {
//     // console.log(response)
//     const jsonData = response.data;
//     try {
//          UsersSChema.create(jsonData.data)
//         console.log('data successfully imported')
//         // to exit the process
        
//       } catch (error) {
//         console.log('error', error)
//       }
//     // console.log(jsonData.data[1]);cl
//   })
//   .catch(error => {
//     console.error('Error fetching JSON data:', error);
//   });
// axios.get(URL.URLPHISICS)
//   .then(response => {
//     // console.log(response)
//     const jsonData = response.data;
//     try {
//          UsersSChema.create(jsonData.data)
//         console.log('data successfully imported')
//         // to exit the process
        
//       } catch (error) {
//         console.log('error', error)
//       }
//     // console.log(jsonData.data[1]);cl
//   })
//   .catch(error => {
//     console.error('Error fetching JSON data:', error);
//   });
// axios.get(URL.URLJAPAN)
//   .then(response => {
//     // console.log(response)
//     const jsonData = response.data;
//     try {
//          UsersSChema.create(jsonData.data)
//         console.log('data successfully imported')
//         // to exit the process
        
//       } catch (error) {
//         console.log('error', error)
//       }
//     // console.log(jsonData.data[1]);cl
//   })
//   .catch(error => {
//     console.error('Error fetching JSON data:', error);
//   });
// axios.get(URL.URLMATH)
//   .then(response => {
//     // console.log(response)
//     const jsonData = response.data;
//     try {
//          UsersSChema.create(jsonData.data)
//         console.log('data successfully imported')
//         // to exit the process
        
//       } catch (error) {
//         console.log('error', error)
//       }
//     // console.log(jsonData.data[1]);cl
//   })
//   .catch(error => {
//     console.error('Error fetching JSON data:', error);
//   });
// axios.get(URL.URLSTRUCT)
//   .then(response => {
//     // console.log(response)
//     const jsonData = response.data;
//     try {
//          UsersSChema.create(jsonData.data)
//         console.log('data successfully imported')
//         // to exit the process
        
//       } catch (error) {
//         console.log('error', error)
//       }
//     // console.log(jsonData.data[1]);cl
//   })
//   .catch(error => {
//     console.error('Error fetching JSON data:', error);
//   });

app.get('/', (req, res) => {
   UsersSChema.find()
   .then(students => {
    // res.json(students)
    res.send(students)
    }
    ).catch(err=>req.json(err))
  });

app.listen(process.env.PORT || 3001, () => {
    console.log("Server is running");
});