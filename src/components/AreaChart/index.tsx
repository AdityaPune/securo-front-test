import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ISeries {
    name: string,
    data: number[]
}

interface IAreaChart {
    series: ISeries[],
    colors: string[],
    categories: string[],
    inDollars?: boolean,
    height?: string,
    width?: string
}

function AreaChart({ series, colors, categories, inDollars, height, width }: IAreaChart) {
    const graphData = {
        series
    }
    const graphDataOptions: ApexOptions = {
        colors,
        chart: {
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            // categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
            categories,
            labels: {
                format: 'dd/MM/yy',
            }
        },
        tooltip: {
            x: {
                format: 'dd/MM/yy HH:mm'
            },
        },
        grid: {
            show: false,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    if (inDollars) {
                        return val.toLocaleString("en-US",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                style: 'currency',
                                currency: 'USD'
                            })
                    }

                    return val.toFixed(2)
                }
            },
            opposite: true
        }
    }
    return <Chart type="area" options={graphDataOptions} series={graphData.series} height={height} width={width} />
}

export default AreaChart;