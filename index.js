import express from "express";
import dotenv  from "dotenv";
import {db_connect} from "./utils/db.js"
dotenv.config()
const port = process.env.PORT||3000
const app = express();
app.use(express.json({ limit: "50mb" }));

app.get("/test", (req, res) => {
    res.status(200).json({
      sucess: true,
      trst: "apis are running",
    });
  });
app.listen(port,()=>{
    console.log("server is running on port ",port)
    db_connect()
})
