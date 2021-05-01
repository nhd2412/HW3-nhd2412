// load the things we need
const express = require('express')
const app = express()
app.use(express.static(__dirname+'/public'));

const path=require("path");
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false})); // gets info from api
const fetch = require('node-fetch');
const ejsMate=require("ejs-mate");
app.engine('ejs',ejsMate);
const { get } = require("http");
const { json } = require('express');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


//index page
app.get('/',(req,res)=>{                                                                // This is Index Page
    let x=[];                                                                          // create a list to add the data from api
    fetch('https://cwrvx8v6xj.execute-api.us-east-2.amazonaws.com/default/apitest')         // This is the link that connect to APi
    .then(res => res.json())
    .then(json => {
         x=json;                                                                           // Get data in json format and put in the list
         res.render('pages/index',{x})                                                  // This is to render the index page
    });
    
    
})

app.post('/',(req,res)=>{                                                       // I create a post for result page
    
    let data=parseInt(req.body.id);
    console.log(data)
    fetch('https://cwrvx8v6xj.execute-api.us-east-2.amazonaws.com/default/apitest')
    .then(res => res.json())
    .then(json => {
       
       const language=json[data];
       res.render('pages/result',{language});                                   // This will render the result page that show all the information that user have chose
         });

})

const port = 3000
app.listen(port, () => {
    console.log(`Front-end app listening at http://localhost:${port}`)
})