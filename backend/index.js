import express from "express";

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server OK! | http://localhost:${port}`);
});

app.get("/health", (req, res) => {
  res.send("Health OK!");
});
