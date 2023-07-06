const express = require("express");
const cors = require('cors');
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Online Compiler" });
});

app.post("/run", async (req, res) => {
  const { language = 'cpp', code, input } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code!" });
  }

  try {
    const filePath = await generateFile(language, code);
    const output = await executeCpp(filePath, input);

    res.json({ output });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
