import React, { useEffect, useState } from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
export default function Chart() {
  let [data, setdata] = useState({});
  let [loading, setloading] = useState(false);
  let [studentres,setstudentres] = useState(0)
  useEffect(() => {
    async function getdata() {
      try {
        setloading(true);
        const response = await axios.get("http://localhost:3000/getdata");
        console.log("Form submitted successfully:", response.data.data[0]);
        setstudentres(response.data.totalDocuments)
        getgenderdistribution(response.data.data[0]);
        getcitydistrybytion(response.data.data[0].cityDistribution);
        getstudydis(response.data.data[0].studiedDistribution);
        setloading(false);
      } catch (error) {
        console.error("There was an error submitting the form:", error);
      }
    }
    getdata();
  }, []);
 
  function getgenderdistribution(data) {
    const Male = [0, 0];
    const Female = [0, 0];
    data.genderSectionDistribution.forEach((element) => {
      element._id === "Male"
        ? element.sections.forEach((element) => {
            element.section === "E1"
              ? (Male[0] = element.count)
              : (Male[1] = element.count);
          })
        : element.sections.forEach((element) => {
            element.section === "E1"
              ? (Female[0] = element.count)
              : (Female[1] = element.count);
          });
    });
    setdata({ ...data, Male, Female });
  }
  function getcitydistrybytion(data) {
    let lablesarray = [];
    console.log("data is ", data);
    data.forEach((el) => {
      lablesarray = [...lablesarray, ...el.cities];
    });
    lablesarray.sort((a, b) => b.count - a.count);
    let uniqueCities = [];
    let seenCities = new Set();

    uniqueCities = lablesarray.filter((item) => {
      if (!seenCities.has(item.city)) {
        seenCities.add(item.city);
        return true;
      }
      return false;
    });
    let cityNames = uniqueCities.map((item) => item.city);
    let e1countincity = [];
    let e2countincity = [];
    cityNames.forEach((el,index) => {
      data.forEach((obj) => {
        if (obj._id === "E1") {
            e1countincity.push(0);
             e2countincity.push(0);
          obj.cities.forEach((citynames) => {
            if (citynames.city === el) {
              e1countincity[index]=citynames.count
            }
          });
        } else {
          obj.cities.forEach((citynames) => {
            if (citynames.city === el) {
                
                e2countincity[index]=citynames.count
            }
          });
        }
      });
    });
    console.log(e1countincity, e2countincity)
    setdata((pre) => ({ ...pre, cityNames, e1countincity, e2countincity }));
  }
  function getstudydis(data) {
    console.log(data)
    let lablesarray = ["ics", "pre-eng", "pre-medical", "others"];
    let e1data = [];
    let e2data = [];
    lablesarray.forEach((el,index) => {
        e1data.push(0)
        e2data.push(0)
      data.forEach((obj) => {
        console.log(obj)
        if (obj._id === "E1") {
          obj.studied.forEach((st) => {
            if (st.subject === el) {
                console.log(index)
              e1data[index]=st.count;
              
            }
          });
        } else {
          obj.studied.forEach((st) => {
            if (st.subject === el) {
                e2data[index]=st.count;
               
            }
          });
        }
      });
    });
    setdata((pre) => ({ ...pre, lablesarray, e1data, e2data }));
  }
  const xLabels = ["E1", "E2"];
  const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
  });
  return (
    <>
    <div className="mt-8 flex flex-col  text-white">
        { studentres<=0 ? <h1 className="text-center">no one sumited form yet</h1> :
            <>
            <h1 className="text-center">Number of student responded {studentres}</h1>
      {/* Gender Distribution for E1 */}
      <h2 className="text-lg font-semibold  mb-4">Gender Distribution in E1</h2>
      {data.Male && data.Female ? (
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
      ) : (
        <p>Loading data</p>
      )}

      {/* City Distribution */}

      <h2 className="text-lg font-semibold  mt-8 mb-4">City Distribution</h2>
      {data.cityNames && data.cityNames.length > 0 ? (
        <ThemeProvider theme={theme}>
          <BarChart
            width={500}
            height={300}
            series={[
              { data: data.e2countincity, label: "E2" },
              { data: data.e1countincity, label: "E1" },
            ]}
            xAxis={[{ data: data.cityNames, scaleType: "band" }]}
            style={{
              color: "white", // This will make the chart background white
              textColor: "white", // Add this to make the text white
            }}
          />
        </ThemeProvider>
      ) : (
        <p>Loading data</p>
      )}
      {/* What Students Have Studied */}
      <h2 className="text-lg font-semibold  mt-8 mb-4">
        What Students Have Studied
      </h2>
      {data.e1data && data.e2data ? (
        <ThemeProvider theme={theme}>
          <BarChart
            width={500}
            height={300}
            series={[
              { data: data.e1data, label: "E1", id: "pvId" },
              { data: data.e2data, label: "E2", id: "uvId" },
            ]}
            xAxis={[{ data: data.lablesarray, scaleType: "band" }]}
            style={{
              color: "white", // This will make the chart background white
              textColor: "white", // Add this to make the text white
            }}
          />
        </ThemeProvider>
      ) : (
        <p>Loading data</p>
      )}
      </>}
    </div>
    </>
  );
}
