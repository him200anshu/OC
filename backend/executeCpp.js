const { exec } = require("child_process");
const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, 'outputs');

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, input) => {
  const jobID = path.basename(filePath).split(".")[0];
  const outPath = path.join(outputPath, `${jobID}.exe`);

  return new Promise((resolve, reject) => {
    const command = `g++ ${filePath} -o ${outPath} && cd ${outputPath} && ./${jobID}.exe`;

    const child = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr });
      } else if (stderr) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });

    if (input) {
      child.stdin.write(input); // Pass the user input to the program
      child.stdin.end();
    }
  });
};

module.exports = {
  executeCpp,
};
