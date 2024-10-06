import express from "express";
import dotenv  from "dotenv";
import {db_connect} from "./utils/db.js"
import cors from "cors"
import { Studentmodel } from "./models/user.model.js";
dotenv.config()
const port = process.env.PORT||3000
const app = express();
app.use(cors(
  {
    origin:["http://localhost:5173"],
  }
));
app.use(express.json({ limit: "50mb" }));
async function getdata() {
  let data = await Studentmodel.collection.aggregate([
    // Group by gender and section, and count each group
    {
      $facet: {
        genderSectionDistribution: [
          {
            $match: { gender: { $in: ["Male", "Female"] }, section: { $in: ["E1", "E2"] } }
          },
          {
            $group: {
              _id: { gender: "$gender", section: "$section" },
              count: { $sum: 1 }
            }
          },
          {
            $group: {
              _id: "$_id.gender",
              sections: {
                $push: {
                  section: "$_id.section",
                  count: "$count"
                }
              }
            }
          }
        ],
        // Get city distribution in sections E1 and E2
        cityDistribution: [
          {
            $match: { section: { $in: ["E1", "E2"] } }
          },
          {
            $group: {
              _id: { section: "$section", city: "$city" },
              count: { $sum: 1 }
            }
          },
          {
            $group: {
              _id: "$_id.section",
              cities: {
                $push: {
                  city: "$_id.city",
                  count: "$count"
                }
              }
            }
          }
        ],
        // Get what students in sections E1 and E2 studied
        studiedDistribution: [
          {
            $match: { section: { $in: ["E1", "E2"] } }
          },
          {
            $group: {
              _id: { section: "$section", studied: "$studied" },
              count: { $sum: 1 }
            }
          },
          {
            $group: {
              _id: "$_id.section",
              studied: {
                $push: {
                  subject: "$_id.studied",
                  count: "$count"
                }
              }
            }
          }
        ]
      }
    }
  ]).toArray(); // Convert the cursor to an array
  
 return data // Output the aggregated data
}

app.get("/test", (req, res) => {
    res.status(200).json({
      sucess: true,
      trst: "apis are running",
    });
  });
  app.post("/post", async(req, res) => {
    const data = req.body
    let Student = new Studentmodel(data)
    await Student.save()
    res.status(200).json({
      sucess: true,
      data1
    });
  });
  app.get("/getdata",async(req,res) => {
    try {
      let data = await getdata();
      res.status(200).json({
        data
      })
    } catch (error) {
     console.log(error) 
    }
  })
app.listen(port,()=>{
    console.log("server is running on port ",port)
    db_connect()
    
})
