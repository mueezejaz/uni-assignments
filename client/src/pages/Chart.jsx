import React, { useEffect, useState } from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
export default function Chart() {
  let [data, setdata] = useState({});
  let [loading, setloading] = useState(false);
  useEffect(() => {
    async function getdata() {
      try {
        setloading(true);
        const response = await axios.get("http://localhost:3000/getdata");
        console.log("Form submitted successfully:", response.data.data[0]);
        getgenderdistribution(response.data.data[0])
        setloading(false);
      } catch (error) {
        console.error("There was an error submitting the form:", error);
      }
    }
    getdata();
    
  }, []);
  const Male = [15, 5];
  const Female = [12, 10];
  function getgenderdistribution(data) {
    const Male = [15, 5];
    const Female = [12, 10];
   data.genderSectionDistribution.forEach(element => {
    element._id === "Male"?
    element.sections.forEach(element =>{
    element.section === "E1" ?
    Male[0] = element.count
    :
    Male[1] = element.count
    }) 
    :
    element.sections.forEach(element =>{
        element.section === "E1" ?
        Female[0] = element.count
        :
        Female[1] = element.count
        }) 
   });
    setdata({...data,Male,Female})
  }
  
  const xLabels = ["E1", "E2"];
  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });
  return (
    <div className="mt-8 flex flex-col  text-white">
      {/* Gender Distribution for E1 */}
      <h2 className="text-lg font-semibold  mb-4">Gender Distribution in E1</h2>
      {
        data.Male&&data.Female?
      <ThemeProvider theme={theme}>
        <BarChart
          width={500}
          height={300}
          series={[
            { data: data.Male, label: "Male", id: "pvId" },
            { data: data.Female, label: "Female", id: "uvId" },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
          style={{
            color: "white", // This will make the chart background white
            textColor: "white", // Add this to make the text white
          }}
        />
      </ThemeProvider>
      :
      <p>Loading data</p>
      }
      
      {/* City Distribution */}
      <h2 className="text-lg font-semibold  mt-8 mb-4">City Distribution</h2>
      <ThemeProvider theme={theme}>
        <BarChart
          width={500}
          height={300}
          series={[
            { data: Male, label: "Male", id: "pvId" },
            { data: Female, label: "Female", id: "uvId" },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
          style={{
            color: "white", // This will make the chart background white
            textColor: "white", // Add this to make the text white
          }}
        />
      </ThemeProvider>
      {/* What Students Have Studied */}
      <h2 className="text-lg font-semibold  mt-8 mb-4">
        What Students Have Studied
      </h2>
      <ThemeProvider theme={theme}>
        <BarChart
          width={500}
          height={300}
          series={[
            { data: Male, label: "Male", id: "pvId" },
            { data: Female, label: "Female", id: "uvId" },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
          style={{
            color: "white", // This will make the chart background white
            textColor: "white", // Add this to make the text white
          }}
        />
      </ThemeProvider>
    </div>
  );
}
