const express = require("express");
const router = require("./router");
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

});