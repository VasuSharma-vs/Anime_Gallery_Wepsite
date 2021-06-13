import express from 'express';
import mongoose from 'mongoose';
import Env from 'dotenv';
import _ from 'lodash';


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
        tag: {
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

    homepage: { 
        clicked: {
            type: Number,
            require: true
        }    
    },

    gallery: { 
        clicked: {
            type: Number,
            require: true
        }          
    },

    contact: { 
        clicked: {
            type: Number,
            require: true
        }
            
    }
}

export class DBModel {

    constructor(property, schema) {
        this.dataBase = _.lowerCase(property);
        this.schema = schema;
        this.Model =  mongoose.model(this.dataBase, this.schema);
    }

     async connectToAtlas(funs) {

        if (this.model !== null) {
            await funs(this.Model);
        }

        
        
    }

    saveToAtlas(obj) {

    }

    findOnAtlas(funs, param=null, property={}) {

        this.Model.findOne(property, (err, docs) => {
            if (!err) {
                param !== null ? funs(docs, param) : funs(docs); 
            } else { 
                console.log(err)};
            });
    
        }

    updateOnAtlas(newData, property={}) {
        this.Model.findOneAndUpdate(property, {$set: newData}, err => !err? console.log('passed'): console.log(err))
    }

}

export class DBManager  {
    constructor(DBName, dataBase=null) {
        this.Modles = {};

        mongoose.connect(
            `mongodb+srv://ArtGallery:5CV@jah!r2uwiSZ@cluster0.wnnrb.mongodb.net/${_.upperFirst(DBName)}s?retryWrites=true&w=majority`, 
            { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false  });

        dataBase !== null && this.CreateModels(dataBase);
        
    }

    CreateModels(data) {

        const Properties = Object.keys(data);

        Properties.forEach( property => {
            this.Modles[_.upperFirst(property)] = new DBModel(property, data[property]);
        });
    }

};


export default DBManager;