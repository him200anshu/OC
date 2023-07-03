const express = require("express");
const {generateFile} = require("./generateFile");
const app =express();
//Middlewares
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//GET

app.get("/",(req,res)=>{
    res.json({ online: "compiler"});
});

//POST

app.post("/run", async (req,res) => {
    const{ language ='cpp',code } = req.body;
    if(code===undefined){
        return res.status(404).json({ success: false,error: "Empty code!"});
    }
    const filePath = await generateFile(language,code);
    res.json({filePath});
});

app.listen(5000,() => {
    console.log("server is running on port 5000!");
})