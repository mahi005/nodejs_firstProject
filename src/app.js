const express = require("express");
const path =require("path");
require("./db/conn");
const app= express();
const User = require("./module/usermessage");
const hbs = require("hbs");
const {registerPartials} = require("hbs");
const port = process.env.PORT || 3000;

const static_path =path.join(__dirname,'../public');
const template_path = path.join(__dirname,"../template/views");
const partial_path = path.join(__dirname,"../template/partials");

app.use(express.urlencoded({extended:false}))

app.use(express.static(static_path));
app.set("view engine" , "hbs");
app.set("views",template_path);
hbs.registerPartials(partial_path);


app.get("/",(req,res)=>{
    res.render("index");
})



app.get("/contact",(req,res)=>{
    res.render("contact");
})
app.post("/index" ,async(req,res)=>{
    try{
        //res.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }
    catch(error){
        res.status(500).send(error);
    }
})

app.listen(port ,()=>{
    console.log(`listenting port ${port}`);
})