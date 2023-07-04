const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

exports.executeCpp = (filePath) => {
  const jobID = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobID}.exe`);
  console.log(outPath);

  return new Promise((resolve, reject) => {
    exec(`g++ ${filepath} -o ${outPath} && cd ${outputPath} && ./${jobId}.exe`, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};
