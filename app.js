// importing modules /////////////////////////////////////////////////////////////////////////////////////////////

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs'
import mongoose from 'mongoose';
import Env from 'dotenv';
import { futimesSync } from 'fs';

// imported modules /////////////////////////////////////////////////////////////////////////////////////////////




// setting up envirment variables ///////////////////////////////////////////////////////////////////////////////

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const env = Env.config();
const app = express();

// setted up envirment variables ///////////////////////////////////////////////////////////////////////////////




// experss settings //////////////////////////////////////////////////////////////////////////////////////////////////////////

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname+"/public"));

//express settings ///////////////////////////////////////////////////////////////////////////////////////////////////////////




// Mongoose Data Base on Atlas ///////////////////////////////////////////////////////////////////////////////

const DBSch = {
    imageSchema: {
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
        },
        tags: {
            type: String
        },
        date: {
            day: {
                type: Number,
                require: true
            },
            Month: {
                type:Number,
                require: true
            },
            year: {
                type: Number,
                require: true
            }
        }
    },
    siteSetting: {
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
    },
    tags: {
        Name: {
            type: String,
            require: true
        }
    }
}

function connectToAtlas(dataBase) {
    const uri =  `mongodb+srv://ArtGallery:5CV@jah!r2uwiSZ@cluster0.wnnrb.mongodb.net/${dataBase}?retryWrites=true&w=majority`;
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    funs();

}

// Mongoose Data Base on Atlas END //////////////////////////////////////////////////////////////////////////




//



// AG.mongod.node.in.app.js

// mongodb+srv://ArtGallery:<password>@cluster0.wnnrb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.route("/")
    .get((req, res)=> {
        res.render("Home");
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


let port = process.env.PORT;

if (port == null || port == "") {
  port = 8000;
}

app.listen(port, function() {
    console.log("Server started on port 3000");
  });