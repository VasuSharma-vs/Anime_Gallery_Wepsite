// importing modules /////////////////////////////////////////////////////////////////////////////////////////////

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';
import mongoose from 'mongoose';
import Env from 'dotenv';
import { futimesSync } from 'fs';
import DBManager from './src/DBManager.js';
import _ from 'lodash';

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

function save() {

    lit.Tag.connectToAtlas( obj => 
        obj({Name: 'vasu'}).save(err => 
            !err ? 
                console.log('passed')
            : 
                console.log(err))
    );
}

const DBSch = {
    images: {
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

    userinfo: {
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
    }, 

    clicked: {
        Homepage: {
            type: Number,
            require: true
        },

        Gallery: {
            type: Number,
            require: true
        },

        Contact: {
            type: Number,
            require: true
        }
    },
}

const DataBase = new DBManager('AGdatabase', DBSch);
const dbModels = DataBase.Modles;

//const lit = new DBManager(DBSch);

// Mongoose Data Base on Atlas END //////////////////////////////////////////////////////////////////////////




// testing area /////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createNewClick() {
    dbModels.Clicked.connectToAtlas((obj)=> {
        new obj({
            Homepage: 0, Gallery: 0, Contact: 0
        }).save(err => !err ? console.log('passed'): console.log(err)) 
    })
}


// testing area //////////////////////////////////////////////////////////////////////////////////////////////////




function UpdateClickOn(page) {

    dbModels.Clicked.findOnAtlas((docs, obj) => {
        obj.updateOnAtlas({[page]: docs[page]+1}, err => !err ? console.log('passed'): console.log(err))
    }, dbModels.Clicked);
    //obj.findOnAtlas((data, obj) =>  
        //obj.updateOnAtlas({clicked: data.clicked+1}, err => err ? console.log(err): null), obj)
}



// AG.mongod.node.in.app.js



app.route("/")
    .get((req, res)=> { 
        UpdateClickOn('Homepage');
        res.render("Home");
    });



app.route("/gallery")
    .get((req,res) => {
        UpdateClickOn('Gallery');
        res.render('gallery')
    });


app.route("/contactMe")
    .get((req,res)=> {
        UpdateClickOn('Contact');
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
  port = 3000;
}

app.listen(port, function() {
    console.log("Server started on port 3000");
  });
