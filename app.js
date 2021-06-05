import express, { Router } from 'express';
import bodyParser from 'body-parser';


const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

Router("/")
    .get((req, res)=> {
        res.send("index.html");
    });


Router("/gallery")
    .get((req,res) => {
        
    });


Router("/contactMe")
    .get((req,res)=> {

    });


Router("Aboutme") 
    .get((req,res) => {

    });


Router("/getin")
    .get((req, res) => {
        res.sendFile("./public/grtin.html")
    });




app.listen(3000, function() {
    console.log("Server started on port 3000");
  });