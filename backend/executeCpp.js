const {exec} = require("child_process");
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'outputs');

if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, { reursive: true });
}

exports.executeCpp = (filePath) => {
   const jobID = path.basename(filePath).split(".")[0];
   const outPath = path.join(outPath, `${jobID}.exe`);
   console.log(outPath);
   /*return new Promise((resolve,reject) => {

   });*/
};