import express from "express";
import conn from "./helpers/connection.js";
import userRoute from "./routes/userRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
if(conn){
  app.listen(port, () => {
    console.log(`DB Connected | Server on port ${port}`);
  });  
}
else{
  console.log("An error occured.")
}

app.use(express.json());
app.use("/user", userRoute);
app.use("/feedback", feedbackRoute);

app.get("/dbtest", async (req, res) => {
  const [result] = await conn.query("select * from users");
  res.send(result);
});
