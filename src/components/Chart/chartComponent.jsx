
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

function ChartComponent(props) {
    const [state, setState] = useState(
        {
            options: {
              chart: {
                id: "main-chart"
              },
              yaxis: {
                show:true,
                labels: {
                  show:true
                }
              },
              xaxis: {
                show:true,
                categories: props.categories,
                labels: {
                  show:true
                }
              }
            },
            series: [
              {
                name: "Crash Risk",
                data: props.data
              },
            ]
          }
    )
    const roundOneHValue = (val) => {
      if( val > 100){
        return "%" +100
      } else{
        return "%"+val
      }
    }
    useEffect(() => {
        setState(
          {
            options: {
              chart: {
                id: "main-chart",
                toolbar: {
                  show: false,
                }
              },
              colors: ["#ff5588"],
              yaxis: {
                show:true,
                labels: {
                  formatter: (value) => roundOneHValue(value),
                  style: {
                    fontSize: "16px",
                    colors: "#828282",
                    fontFamily: "Calibri Regular",
                    fontWeight: 400,
                    cssClass: "apexcharts-xaxis-label"
                  }
                }
              },
              xaxis: {
                categories: props.categories,
                series: [
                  {
                    name: "Crash Risk",
                    data: props.categories
                  },
                ],
                type: "category",
                labels: {
                  formatter: (value) => "x "+value,
                  style: {
                    fontSize: "16px",
                    colors: "#828282",
                    fontFamily: "Calibri Regular",
                    fontWeight: 400,
                    cssClass: "apexcharts-xaxis-label"
                  }
                },
                axisBorder: {
                  show: false
                },
                axisTicks: {
                  show: false
                }
              },
            },
            series: [
              {
                name: "Crash Risk",
                data: props.data
              },
            ]
          }
        )
    }, [props])

    return (
        <Chart
        options={state.options}
        series={state.series}
        type="line"
        width="520"
      />
    )
}


export default ChartComponent

