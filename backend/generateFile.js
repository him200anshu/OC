const fs = require('fs');
const path = require('path');
const {v4: uuid} = require('uuid');

const dirCodes = path.join(__dirname, 'codes');

if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, { reursive: true });
}

exports.generateFile =async (format,content) => {
   const jobID = uuid();
   const fileName = `${jobID}.${format}`;
   const filePath = path.join(dirCodes, fileName);
   //SfilePath.replace(/\\/g, "\\\\");
   await fs.writeFileSync(filePath, content);
   return filePath; 
}
