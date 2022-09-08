import { Grid, Typography, useMediaQuery } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store/hooks"
import { Card, Box } from "@mui/material"

import './invest.scss'
import LineChart from "../../components/LineChart"

import { useEffect, useState } from "react";
import { getStrategyPerformanceChart } from "../../services/axios/strategyPerformanceChart";

function InvestMain() {
    const productList = useAppSelector(state => state.product.productList)
    const images: { [x: string]: any } = {}

    const [chartData, setChartData] = useState([[0]])
    const [timestampData, setTimestampData] = useState([[(new Date()).toString()]])
    const colors = [["#9ABFF5"], ["#76D1BF"], ["#C89EFE"]]
    const matches = useMediaQuery('(max-width:300px)')
    // const matches1 = useMediaQuery('(min-width:600px) and (max-width:700px)')

    // console.log("matches1", matches1)

    const navigate = useNavigate()
    const navigateToPage = (symbol: string) => {
        navigate(`/invest/${symbol}`)
    }

    useEffect(() => {
        const arr: any[] = []

        async function fetch(a: any[]) {
            let response = await Promise.all(a)
            let performanceData = response.map(r => r.data.data)

            let newChartData = [];
            let newTimestampData = [];

            for (let i = 0; i < performanceData.length; i++) {
                let arrayElementDataChangePercentage = []
                let arrayElementDataTimestamp = []

                for (let j = 0; j < performanceData[i].length; j++) {
                    // console.log(performanceData[i][j])
                    arrayElementDataChangePercentage.push(parseFloat(parseFloat(performanceData[i][j].changePercentage).toFixed(2)))
                    arrayElementDataTimestamp.push((new Date(parseInt(performanceData[i][j].timeStamp))).toString())
                }
                newChartData.push(arrayElementDataChangePercentage)
                newTimestampData.push(arrayElementDataTimestamp)
            }

            // console.log("new chart data", newChartData)
            // console.log("new chart data", newTimestampData)

            setChartData(newChartData)
            setTimestampData(newTimestampData)
        }

        function arrayGenereator(length: number) {
            for (let i = 1; i < length + 1; i++) {
                arr.push(getStrategyPerformanceChart("7d", i.toString()))
            }

            fetch(arr)
        }

        if (productList && productList.length !== 0) {
            arrayGenereator(productList.length)
        }

    }, [productList])

    return <>
        {/* <Grid container style={{ "marginTop": "20px", "overflowX": "hidden" }} spacing={1} > */}
        <Box mt={1} style={{ marginRight: "20px", marginLeft: "30px" }}>
            <Grid container spacing={1}>
                {images !== null && productList.map((p, i) => {
                    return <Grid item xs={12} sm={6} lg={4} id="invest-container" key={i}>
                        {/* <WhiteWrapper> */}
                        <Box mx={1} mb={2}>
                            <Card className="invest" onClick={() => navigateToPage(p.symbol)}>
                                <Box p={2}>
                                    <img src={require(`../../assets/images/products/${p.symbol.toLowerCase()}.svg`)} alt="test" style={{ "width": "40px", "marginBottom": "5px", "marginTop": "10px" }} />
                                    <Box style={!matches ? { "marginBottom": "20px", "height": "130px" } : { "marginBottom": "20px", "height": "170px" }}>
                                        <Box className="product-label-container" mb={1}>
                                            <Box mb={1}><Typography className="product-label">{p.name}</Typography></Box>
                                            <Box ><Typography className="product-short-desc">{p.shortDesc}</Typography></Box>
                                        </Box>
                                    </Box>
                                    <Box className='product-composition'>
                                        <Box mb={1}><Typography className="strategy-composition">Strategy Composition:</Typography></Box>
                                        <Box mb={1}><img className="strategy-composition-img" src={require(`../../assets/images/product_distribution/${p.symbol.toLowerCase()}.svg`)} alt="test" /></Box>
                                    </Box>
                                    <Box>
                                        <Box mb={1}>
                                            <LineChart
                                                series={[{
                                                    name: 'Percent Change',
                                                    data: chartData[i]
                                                }]}
                                                colors={colors[i]}
                                                categories={timestampData[i]}
                                            />
                                        </Box>
                                        <Box mb={3} className="asset-allocation" display="flex">
                                            <Grid container>
                                                <Grid item xs={10}>
                                                    Assets
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Box display="flex" justifyContent="flex-end">
                                                        <Box>Allocation</Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                        {p.tokenAllocation.map((token: any, i: number) => {
                                            return (<Grid container key={i}>
                                                <Grid item xs={10} className="assets">
                                                    <Box display="flex">
                                                        <Box mr={1}><img src={require(`../../assets/images/icons/${token.tokenSymbol.toLowerCase()}.svg`)} style={{ "width": "15px", "height": "15px" }} /></Box>
                                                        <Box>{token.tokenName}<Box component="span" ml={0.5}>({token.tokenSymbol.toUpperCase()})</Box></Box>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={2} >
                                                    <Box display="flex" justifyContent="flex-end">
                                                        <Box mb={2} className="allocation-percentage">{token.allocation}%</Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                            )
                                        })}
                                    </Box>
                                </Box>
                            </Card>
                        </Box>
                        {/* </WhiteWrapper> */}
                    </Grid>
                })}
            </Grid>
        </Box>
        {/* </Grid> */}
    </>
}

export default InvestMain;