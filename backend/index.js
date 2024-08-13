import express from "express";
import conn from "./helpers/connection.js";
import userRoute from "./routes/userRoute.js";
import feedbackRoute from "./routes/feedbackRoute.js";
import eventsRoute from "./routes/eventsRoute.js";
import jobsRoute from "./routes/jobsRoute.js";
import learningResourcesRoute from "./routes/learningResourcesRoute.js"
import notificationRoute from "./routes/notificationRoute.js"
import dashboardRoute from "./routes/dashboardRoute.js";
import careerClarityRoute from "./routes/careerClarityRoute.js";

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
app.use("/events", eventsRoute)
app.use("/jobs", jobsRoute)
app.use("/resources", learningResourcesRoute)
app.use("/notifications", notificationRoute)
app.use("/dashboard", dashboardRoute);
app.use("/careerclarity", careerClarityRoute);

app.get("/health", async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "HEALTH OK",
  });
});
