const express = require("express");
const app = express();

//--------------------PORT----------------------------

const PORT = 3000;
app.listen(PORT, (test) => {
  console.log(`Connected to: https://localhost:${PORT}`);
});
