const express = require("express");
const {generateFile} = require("./generateFile");
const {executeCpp} = require("./executeCpp");
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
    try {
    const filePath = await generateFile(language,code);
    const output = await executeCpp(filePath);
    res.json({filePath, output});
    } catch(error) {
        res.status(500).json({ error: error });
    }
});

app.listen(5000,() => {
    console.log("server is running on port 5000!");
})