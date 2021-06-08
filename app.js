// importing modules /////////////////////////////////////////////////////////////////////////////////////////////

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Env from 'dotenv';

// imported modules /////////////////////////////////////////////////////////////////////////////////////////////




// experss settings //////////////////////////////////////////////////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

//express settings ///////////////////////////////////////////////////////////////////////////////////////////////////////////




// setting up envirment variables ///////////////////////////////////////////////////////////////////////////////

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = Env.config();
const app = express();

// setting up envirment variables ///////////////////////////////////////////////////////////////////////////////




// Mongoose Data Base on Atlas ///////////////////////////////////////////////////////////////////////////////


const imageSchema = {
    imagestring: {
        type: String,
        require: true
    },
    Name: {
        type: String,
        require: true
    },
    descriptions: {
        type: String,
        require: true
    }
}
const siteSetting = {
    SiteName: {
        type : String,
        require: true
    },
    Email: {
        type: String,
        requere: true
    },
    phone: {
        type: String,
    },
    instaid: {
        type: String,
    },
    facebookid: {
        type: String
    },
    twitterid: {
        type: String
    },
    linkdin: {
        type: String
    }
}

function connectToAtlas(dataBase) {
    const uri =  `mongodb+srv://${process.env.MA_username}:${process.env.MA_password}@cluster0.wnnrb.mongodb.net/${dataBase}?retryWrites=true&w=majority`;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

// Mongoose Data Base on Atlas END //////////////////////////////////////////////////////////////////////////




//



// AG.mongod.node.in.app.js

// mongodb+srv://ArtGallery:<password>@cluster0.wnnrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.route("/")
    .get((req, res)=> {

        res.sendFile(__dirname+"/src/home.html");
    });

app.route("/gallery")
    .get((req,res) => {
        res.sendFile(__dirname+'/src/gallery.html')
    });


app.route("/contactMe")
    .get((req,res)=> {

    });


app.route("/Aboutme") 
    .get((req,res) => {

    });


app.route("/getin")
    .get((req, res) => {
        res.sendFile("./public/grtin.html")
    });




app.listen(3000, function() {
    console.log("Server started on port 3000");
  });