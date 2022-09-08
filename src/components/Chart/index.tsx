import { useCallback, useContext, useEffect, useState } from "react";

import Chart from 'react-apexcharts';

import CircularProgress from '@mui/material/CircularProgress';

import { Typography } from "@mui/material";
import {makeStyles} from '@mui/styles';

import * as dateFns from "date-fns"
import { CustomThemeContext } from "../../theme/CustomThemeProvider";
import { ApexOptions } from "apexcharts";

import  './chart.scss'

const useStyles = makeStyles(() => ({
    chartContainer: {
        '& #apexchartsbasicbar': {
           '& .apexcharts-svg': {
                overflow: "overlay",
           }
        }
    }
}));

function LoadingContainer(){
    return <div style={{minHeight: "390px", display: "flex", alignItems:"center", justifyContent: "center", flexDirection: "column"}}>
        <CircularProgress color="primary" />
        <Typography variant="h5" style={{marginTop: "15px", color: "#ffffff"}}>Loading Chart...</Typography>
    </div> 
}

export default function StrategyChart({ strategyId } : { strategyId: string }) {
    const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
    const [chartData, setChartData] = useState<any[]>([]);
    const [chartCategories, setChartCategories ] = useState([]);
    const [tickAmount] = useState(7);
    const [loading, setLoading] = useState(false);

    const [performance, setPerformance] = useState(0)

    const { currentTheme } = useContext(CustomThemeContext);
    const [fontColor, setFontColor ] = useState("#ffffff")

    const periods = [
        { label: "1d", value: "1d"},
        { label: "1w", value: "7d"},
        { label: "1m", value: "1m"},
        { label: "6m", value: "6m"},
        { label: "1y", value: "1y"},
    ]

    const classes = useStyles();

    const getChartData = useCallback(async() => {
        setLoading(true);
        const strategyId = "foloWhale";
        // let data = await getStrategyChartData(strategyId, selectedTimeRange)
        let data = null
        
        // if(data?.status === 200) {
        //     const pnlDatas = data?.data.data
        //     const firstData = pnlDatas[0]
        //     const lastData = pnlDatas[pnlDatas.length - 1]

        //     if(firstData === undefined ) {
        //         setChartData([])
        //         return
        //     }

        //     setPerformance(lastData.performance["LP"]) 
            
        //     const seriesNames = Object.keys(firstData.performance)
        //     const series: any = [];
        //     const xAxisLabels = pnlDatas.map((p : any) => dateFns.format(p.timestamp, "dd/MM/yyyy"))

        //     setChartCategories(xAxisLabels)

        //     seriesNames.forEach(s => {
        //         const seriesObject: any = {
        //             name: s,
        //             data: []
        //         }
        //         pnlDatas.forEach((p : any)=> {
        //            const performanceObject = p.performance[s]
        //            seriesObject.data.push(performanceObject)
        //         })

        //         series.push(seriesObject)
        //     })

        //     setChartData(series)
        // }
        setLoading(false);
    }, [strategyId, selectedTimeRange])
   
    useEffect(() => {
        getChartData()
    }, [strategyId, selectedTimeRange])

    useEffect(() => {
        setFontColor(currentTheme === 'dark' ? "#ffffff" : "#000000")
    }, [currentTheme]) 

    const chartOption: ApexOptions = {
        chart: {
            id: "basicbar",
            toolbar: {
                show: false,
            },
            fontFamily: "Inter",
            foreColor:  `${fontColor}`,
            width: '100%'
        },
        grid: {
            show: false,
        },
        stroke: {
            curve: 'smooth',
        },
        xaxis: {
            type: "category",
            categories: chartCategories,
            tickAmount: tickAmount, // To reduce or increase the number of label on chart
            labels: {
                rotate: -60
            },
        },
        yaxis: {
            opposite: true,
            title: {
                text: "Performance (%)",
                rotate: -90,
                offsetX: 0,
                offsetY: 0,
            },
            labels: {
                style: {
                    colors: `${fontColor}`,
                    // cssClass: 'apexcharts-xaxis-label',
                },
                formatter: function (value:any) {
                    return Number(value).toFixed(2);
                },
            }
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            y: {
                formatter: function (value: any) {
                    return `${Number(value).toFixed(2)}%`
                },
                title: {
                    formatter: (seriesName: any) => seriesName,
                },
            },
            theme: `${currentTheme}`
        },
        noData: {
            text: undefined,
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
                color: undefined,
                fontSize: '14px',
                fontFamily: undefined,
            },
        },
    }

   
    return loading ? <LoadingContainer /> : <div className={classes.chartContainer}>
        <div className="flex-row flex-space-between" >
            <div className="period-item">
                <span>{performance > 0 ? '+' : "-"}</span>
                {performance.toFixed(2)}%
            </div>

            <div className="flex-row" style={{alignItems: "flex-end"}}>
                {periods.map(p => {
                    return<div className="period-item" onClick={() => setSelectedTimeRange(p.value)}>{p.label}</div>
                })}  
            </div>
        </div>
       
        <Chart type={'line'} options={chartOption}
            series={chartData}
        />
    </div>;
}