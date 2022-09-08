import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";

function PieChart({ series, labels, colors, scale }: { series: any[], labels: any[], colors?: any[], scale?: number }) {
  let customScale = 0.8
  if (scale) {
    customScale = scale
  }
  const options: ApexOptions = {
    chart: {
      width: "100%",
      type: "donut",
    },
    plotOptions: {
      pie: {
        customScale: customScale,
        startAngle: -90,
        endAngle: 270,
      },
    },
    colors,
    labels,
    fill: {
      type: "gradient",
    },
    legend: {
      show: false,
    },
    title: {
      text: "",
    },
    tooltip: {
      y: {
        formatter: (value) => {
          return value + "%";
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return <Chart type={"donut"} options={options} series={series} />;
}

export default PieChart;
