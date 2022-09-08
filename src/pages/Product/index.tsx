import { Box, Grid, Typography, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { createTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
// import green from '@mui/material/colors/green';

import WhiteWrapper from "../../components/WhiteWrapper";

import './product.scss'
import ProductDistribution from "../../components/Distrbution";
import AreaChart from "../../components/AreaChart";
import InvestTab from "../../components/InvestTab";

import { getStrategyPerformanceChart } from "../../services/axios/strategyPerformanceChart";
import TextWithBreak from "../../components/TextWithBreak";
import PDFSymbol from "../../assets/images/icons/pdffile.svg";

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: "#fff"
        }
    }
});

const useStyles = makeStyles({

    primary: {
        color: 'black',
        fontWeight: 700,
        border: 'none',
        backgroundColor: 'white',
        fontSize: '14px',
        borderRadius: '5px'
    },
    secondary: {
        color: 'white',
        fontWeight: 700,
        backgroundColor: '#76D1BF',
        pointerEvents: 'none',
        border: 'none',
        fontSize: '14px',
        borderRadius: '5px'
    }

});

const buttons = ['1W', '1M', '6M', '1Y'];

function Product() {
    const { symbol } = useParams();

    const productList = useAppSelector(state => state.product.productList)
    const [product, setProduct] = useState<any>(null)
    const [buttonColors, setButtonColors] = useState([true, false, false, false]);
    const classes = useStyles();
    const [chartData, setChartData] = useState([]);
    const [timestampData, setTimestampData] = useState([]);
    const [colors, setColors] = useState(["#76D1BF"]);
    const chartColors = [["#9ABFF5"], ["#76D1BF"], ["#C89EFE"]]

    const onClick = (index: number) => {
        let newButtonColors = buttonColors.map((button, i) => {
            if (i === index) {
                return true
            } else {
                return false
            }
        })
        setButtonColors(newButtonColors)
    }

    useEffect(() => {
        if (symbol !== undefined && productList.length > 0) {
            const chosenProduct = productList.find(p => p.symbol.toLowerCase() === symbol.toLowerCase())
            setProduct(chosenProduct)
        }
    }, [symbol, productList])

    useEffect(() => {
        // console.log(product, "product id")

        const fetchdata = async (period: string) => {
            if (product) {
                let response = await getStrategyPerformanceChart(period, product.id.toString())
                let strategyPerformanceChartData = response.data.data;

                let newChartData = strategyPerformanceChartData.map(
                    (p: {
                        changePercentage: number,
                        currentPrice: string,
                        productId: number,
                        productName: string,
                        timeStamp: string
                    }) => parseFloat(p.changePercentage.toFixed(2)))

                let newTimestampData = strategyPerformanceChartData.map(
                    (p: {
                        changePercentage: number,
                        currentPrice: string,
                        productId: number,
                        productName: string,
                        timeStamp: string
                    }) => (new Date(parseInt(p.timeStamp))).toString())

                // console.log("chart data", newChartData)
                // console.log("timestamp data", newTimestampData)

                switch (product.id) {
                    case 1:
                        setColors(chartColors[0])
                        break;
                    case 2:
                        setColors(chartColors[1])
                        break;
                    case 3:
                        setColors(chartColors[2])
                        break;
                    default:
                        setColors(chartColors[0])
                }


                setChartData(newChartData);
                setTimestampData(newTimestampData)
            }
        }

        let index = buttonColors.findIndex(p => p === true)
        let period = "7d";

        // console.log(index, " = index")

        switch (index) {
            case 0:
                period = "7d"
                break;
            case 1:
                period = "1m"
                break;
            case 2:
                period = "6m"
                break;
            case 3:
                period = "1y"
                break;
            default:
                period = "7d"
        }

        fetchdata(period)

    }, [buttonColors, product])

    const labels = product !== null ? product.tokenAllocation.map((token: any) => token.tokenSymbol.toUpperCase()) : "";
    const series = product !== null ? product.tokenAllocation.map((token: any) => token.allocation) : "";
    const percentChangeArray = product !== null ? product.tokenAllocation.map((token: any) => token.changePercentage) : "";

    if (product === undefined || product === null) {
        return <span>Not available</span>
    }

    return (
        <Grid container style={{ marginLeft: "20px", marginRight: "30px" }}>
            <Grid item xs={12}>
                <Box mt={2} ml={2}>
                    <Card>
                        <Box id="product-wrapper" p={2}>
                            <WhiteWrapper>
                                <Grid container className="product-container">
                                    <Grid item xs={12}>
                                        <img src={require(`../../assets/images/products/${product?.symbol?.toLowerCase()}.svg`)} alt={product?.name} style={{ "width": "40px", "marginBottom": "10px" }} />
                                    </Grid>
                                    <Grid item sm={12} lg={7} className="product-name-container">
                                        <Typography className="product-name">{product.name}</Typography>
                                        <Box className="product-description-container" mb={5}>
                                            <Typography className="short-desc">{product.shortDesc}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12} lg={7}>
                                            <ProductDistribution mode="strategy" labels={labels} series={series} percentChangeArray={percentChangeArray} />
                                        </Grid>

                                        <Grid item xs={12} lg={5} order={{ xs: 3, lg: 2 }}>
                                            <Box display="flex" justifyContent="center"> <InvestTab /></Box>
                                        </Grid>

                                        <Grid item xs={12} lg={7} order={{ xs: 2, lg: 3 }}>
                                            <Box mb={4}>
                                                <Box id="strategy-performance" mb={5} mt={3}>
                                                    Strategy Performance
                                                </Box>
                                                <Box mb={1} display="flex" justifyContent="flex-end">
                                                    <StyledEngineProvider injectFirst>
                                                        <ThemeProvider theme={buttonTheme}>
                                                            {buttons.map((button, index) =>
                                                                <button key={index}
                                                                    className={buttonColors[index] ?
                                                                        classes.secondary :
                                                                        classes.primary}
                                                                    onClick={() => onClick(index)}
                                                                    style={{ "marginRight": "15px" }}>
                                                                    {button}
                                                                </button>
                                                            )}
                                                        </ThemeProvider>
                                                    </StyledEngineProvider>
                                                </Box>
                                            </Box>
                                            <Box>
                                                <AreaChart
                                                    series={[{
                                                        name: 'Percent Change',
                                                        data: chartData
                                                    }]}
                                                    colors={colors}
                                                    categories={timestampData}
                                                />
                                            </Box>
                                            <Box style={{ "fontWeight": "400", "fontSize": "12px" }} mt={3}>
                                                <a href={product.factSheet} target="_blank">
                                                    Download the strategy factsheet for more information  <span style={{ position: "relative", top: "6px", marginLeft: "4px" }}><img src={PDFSymbol} /></span>
                                                </a>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} lg={5} order={4}>
                                            <Box className="product-description-container" mt={4}>
                                                <Box mb={1}><Typography className="title">Overview</Typography></Box>
                                                <Typography className="desc">
                                                    {product !== undefined && <TextWithBreak sentence={product.overview} />}
                                                </Typography>
                                            </Box>

                                            <Box className="product-description-container" mt={2}>
                                                <Box mb={1}><Typography className="title">Risks</Typography></Box>
                                                <Box mb={1}>
                                                    <Typography className="category">{product.riskCategory.charAt(0).toUpperCase() + product.riskCategory.substring(1)}</Typography>
                                                </Box>
                                                <Typography className="desc">
                                                    {product !== undefined && <TextWithBreak sentence={product.riskDesc} />}
                                                </Typography>
                                            </Box>
                                        </Grid>

                                    </Grid>
                                </Grid>
                            </WhiteWrapper>
                        </Box>
                    </Card>
                </Box>
            </Grid >
        </Grid >
    );
}

export default Product;