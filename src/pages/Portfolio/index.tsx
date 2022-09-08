import { Card, CardContent, useMediaQuery } from "@mui/material";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { createTheme } from '@mui/material/styles';
import makeStyles from '@mui/styles/makeStyles';
import { ThemeProvider, Theme, StyledEngineProvider } from "@mui/material";
// import green from '@mui/material/colors/green';
import "./portfolio.scss";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import AreaChart from "../../components/AreaChart";
import PieChart from "../../components/PieChart";

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowDropUp from '../../assets/images/icons/up.svg';
import ArrowDropDownIcon from '../../assets/images/icons/down.svg';

import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { getportfolioPerformanceChart } from "../../services/axios/portfolioPerformanceChart";

const useTableStyles = makeStyles({

    primary: {
        color: '#15C73E',
        fontWeight: 400
    }

});

function StrategyPerformanceTable() {

    const matches = useMediaQuery('(max-width:600px)');
    const classes = useTableStyles();
    const strategyPerformanceList = useAppSelector(state => state.strategyPerformance.strategyPerformanceList)

    function createData(name: string, price: string, holdings: string, twentyFourHours: string, PnL: string, PnLPercentChange: string) {
        return { name, price, holdings, twentyFourHours, PnL, PnLPercentChange };
    }

    const [MWIData, setMWIData] = useState(createData('Market Weighted Index', "0", "0", "0", "0", "0"))
    const [BNIData, setBNIData] = useState(createData('Blockchain Network Index', "0", "0", "0", "0", "0"))
    const [LCIData, setLCIData] = useState(createData('Low-risk Crypto Index', "0", "0", "0", "0", "0"))

    const rows = [MWIData, BNIData, LCIData];
    const symbols = ["MWI", "BNI", "LCI"];

    const helper = (index: number) => {

        const { productName,
            pricePerFullShare,
            holding,
            ppfsChangePercentage,
            profitAndLoss,
            profitAndLossPercentage
        } = strategyPerformanceList[index];

        const data = {
            name: productName,
            price: parseFloat(pricePerFullShare)
                .toLocaleString("en-US",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'USD'
                    }),

            holdings: holding,
            twentyFourHours: parseFloat(ppfsChangePercentage).toFixed(2),
            PnL: parseFloat(profitAndLoss)
                .toLocaleString("en-US",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        style: 'currency',
                        currency: 'USD'
                    }),
            PnLPercentChange: parseFloat(profitAndLossPercentage).toFixed(2)
        }

        switch (productName) {
            case 'Market Weighted Index':
                setMWIData(data);
                break;
            case 'Blockchain Network Index':
                setBNIData(data);
                break;
            case 'Low-risk Crypto Index':
                setLCIData(data);
                break;
            default:
                console.log("product name doesnt match")
        }
    }

    useEffect(() => {
        if (strategyPerformanceList.length !== 0) {

            if (strategyPerformanceList[0]) {
                helper(0)
            }

            if (strategyPerformanceList[1]) {
                helper(1)
            }

            if (strategyPerformanceList[2]) {
                helper(2)
            }
        }
    }, [strategyPerformanceList])

    let newShowTableValue = false;
    for (let i = 0; i < rows.length; i++) {
        if (parseFloat(rows[i].holdings) !== 0) {
            newShowTableValue = true
            break;
        }
    }

    if (!newShowTableValue) {
        return <>No records found</>
    }

    if (!matches) {
        return (
            <TableContainer >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell id="table-headings" style={{ "width": "250px" }}>Name</TableCell>
                            <TableCell align="right" id="table-headings">Price</TableCell>
                            <TableCell align="right" id="table-headings">Holdings</TableCell>
                            <TableCell align="right" id="table-headings">24H</TableCell>
                            <TableCell align="right" id="table-headings">Profit/Loss</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                            if (parseFloat(row.holdings) !== 0)
                                return (
                                    <TableRow key={row.name}>
                                        {/* {console.log(row.holdings, "holdings")} */}
                                        <TableCell id={index === rows.length - 1 ? "noBorder" : "tableCells"} component="th" scope="row">
                                            <Box display="flex" alignItems="center">
                                                <Box mr={2} component="span"><img src={require(`../../assets/images/products/${symbols[index].toLowerCase()}.svg`)} alt="product" height="37" width="37" /></Box>
                                                <Box component="span">{row.name}</Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right" id={index === rows.length - 1 ? "noBorder" : "tableCells"}>{row.price}</TableCell>
                                        <TableCell align="right" id={index === rows.length - 1 ? "noBorder" : "tableCells"}>
                                            {parseFloat(row.holdings)
                                                .toLocaleString("en-US",
                                                    {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                        style: 'currency',
                                                        currency: 'USD'
                                                    })}
                                        </TableCell>
                                        <TableCell align="right" id={index === rows.length - 1 ? "noBorder" : "tableCells"}>
                                            <Box className={parseFloat(row.twentyFourHours) >= 0 ? "positive" : "negative"}>
                                                {/* {parseFloat(row.twentyFourHours) >= 0 ? "+" : "-"} */}
                                                {row.twentyFourHours}%
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right" id={index === rows.length - 1 ? "noBorder" : "tableCells"}>
                                            <Box mt={2}>{row.PnL}</Box>
                                            <Box className={parseFloat(row.PnLPercentChange) >= 0 ? "positive" : "negative"}>
                                                {/* {parseFloat(row.PnLPercentChange) >= 0 ? "+" : "-"} */}
                                                {row.PnLPercentChange}%
                                            </Box>
                                        </TableCell>
                                    </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    } else {
        return (
            <Box>
                {rows.map((row, index) => {
                    if (parseFloat(row.holdings) !== 0) {
                        return (
                            <Box style={{ fontFamily: "OpenSans", borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }} mb={3} key={index}>
                                <Box display="flex">
                                    <Box mr={1}>
                                        <img src={require(`../../assets/images/products/${symbols[index].toLowerCase()}.svg`)} alt="product" height="30" width="30" ></img>
                                    </Box>
                                    <Box>
                                        <Box style={{ fontSize: "10px", color: "#7C7C7C" }}>
                                            Name
                                        </Box>
                                        <Box>
                                            {row.name}
                                        </Box>
                                    </Box>
                                </Box>
                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <Box style={{ fontSize: "14px", fontWeight: 700 }}>Price</Box>
                                    <Box style={{ fontSize: "14px", fontWeight: 400, color: "#454545" }}>{row.price}</Box>
                                </Box>
                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <Box style={{ fontSize: "14px", fontWeight: 700 }}>Holdings</Box>
                                    <Box style={{ fontSize: "14px", fontWeight: 400, color: "#454545" }}>                                            {parseFloat(row.holdings)
                                        .toLocaleString("en-US",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                                style: 'currency',
                                                currency: 'USD'
                                            })}
                                    </Box>
                                </Box>
                                <Box display="flex" justifyContent="space-between" mt={2}>
                                    <Box style={{ fontSize: "14px", fontWeight: 700 }}>24H</Box>
                                    <Box style={{ fontSize: "14px", fontWeight: 400 }}
                                        className={parseFloat(row.twentyFourHours) >= 0 ? "positive" : "negative"}>
                                        {row.twentyFourHours}%
                                    </Box>
                                </Box>
                                <Box display="flex" justifyContent="space-between" mt={2} mb={2}>
                                    <Box style={{ fontSize: "14px", fontWeight: 700 }}>Profit/Loss</Box>
                                    <Box>
                                        <Box style={{ fontSize: "14px", fontWeight: 400, color: "#454545" }}>{row.PnL}</Box>
                                        <Box style={{ fontSize: "12px", fontWeight: 400 }}
                                            className={parseFloat(row.PnLPercentChange) >= 0 ? "positive" : "negative"}>
                                            {row.PnLPercentChange}%
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        )
                    }
                })}
            </Box>);
    }
}

function PortfolioAllocationTable() {

    function createData(strategy: string, allocation: string, last24Hr: string) {
        return { strategy, allocation, last24Hr };
    }

    const matches = useMediaQuery('(max-width:600px)')
    const matches1 = useMediaQuery('(min-width:600px) and (max-width:960px)')

    const portfolioAllocation = useAppSelector(state => state.strategyPerformance.portfolioAllocation.allocations)

    const [LCIData, setLCIData] = useState(createData('Low-risk Crypto Index', "0", "0"))
    const [MWIData, setMWIData] = useState(createData('Market Weighted Index', "0", "0"))
    const [BNIData, setBNIData] = useState(createData('Blockchain Network Index', "0", "0"))
    const [WalletData, setWalletData] = useState(createData('Cash', "0", "-"))

    // const colors = [["#9ABFF5"], ["#76D1BF"], ["#C89EFE"]]

    const colors: { [x: string]: string } = {
        'Market Weighted Index': '#07F2C3',
        'Blockchain Network Index': '#C307F2',
        'Low-risk Crypto Index': '#68B0FF',
        'Cash': '#F1936C'
    }

    const rows = [
        MWIData,
        BNIData,
        LCIData,
        WalletData
    ];

    const helper = (index: number) => {
        const { productName,
            changePercentage,
            allocation
        } = portfolioAllocation[index];

        let last24result = ''

        if (productName !== 'Cash') {
            last24result = parseFloat(changePercentage).toFixed(2)
        } else {
            last24result = '-'
        }

        // let last24result = parseFloat(changePercentage).toFixed(2)

        const data = {
            strategy: productName,
            allocation,
            last24Hr: last24result
        }

        switch (productName) {
            case 'Market Weighted Index':
                setMWIData(data);
                break;
            case 'Blockchain Network Index':
                setBNIData(data);
                break;
            case 'Low-risk Crypto Index':
                setLCIData(data);
                break;
            case 'Cash':
                setWalletData(data);
                // console.log(data)
                break;
            default:
                console.log("product name doesnt match")
        }
    }

    useEffect(() => {

        if (portfolioAllocation && portfolioAllocation.length !== 0) {
            if (portfolioAllocation[0]) {
                helper(0)
            }

            if (portfolioAllocation[1]) {
                helper(1)
            }

            if (portfolioAllocation[2]) {
                helper(2)
            }

            if (portfolioAllocation[3]) {
                helper(3)
            }
        }

    }, [portfolioAllocation])

    const series = [parseFloat(parseFloat(MWIData.allocation).toFixed(2)), parseFloat(parseFloat(BNIData.allocation).toFixed(2)), parseFloat(parseFloat(LCIData.allocation).toFixed(2)), parseFloat(parseFloat(WalletData.allocation).toFixed(2))]
    const labels = [MWIData.strategy, BNIData.strategy, LCIData.strategy, WalletData.strategy]

    const value24hour = (data: any) => {
        if (data === '-') {
            return '-'
        } else if (parseFloat(data) < 0) {
            return parseFloat(data).toFixed(2).substring(1)
        } else {
            return parseFloat(data).toFixed(2)
        }
    }

    let newShowTableValue = false;
    for (let i = 0; i < rows.length; i++) {
        if (parseFloat(rows[i].allocation) !== 0) {
            newShowTableValue = true
            break;
        }
    }

    if (!newShowTableValue) {
        return <>No records found</>
    }

    return (
        <Box mt={1}>
            <Grid container spacing={2}>
                {<>
                    <Grid item md={5} xs={12} sm={10}>
                        <Box>
                            <PieChart series={series} labels={labels} colors={Object.values(colors)} scale={matches1 ? 0.6 : 0.7} />
                        </Box>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        {!matches ? <Box>
                            <TableContainer>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell id="table-headings-portfolio" style={{ "width": "250px" }}>Strategy</TableCell>
                                            <TableCell align="left" id="table-headings-portfolio">Allocation</TableCell>
                                            <TableCell align="left" id="table-headings-portfolio"><Box>Last 24 Hr</Box></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, index) => {
                                            // console.log(row.allocation, "allocation", row.strategy, "name")
                                            if (parseFloat(row.allocation) !== 0)
                                                return (<TableRow key={index}>
                                                    <TableCell id={"noBorder"} component="th" scope="row">
                                                        <Box display="flex" alignItems="center">
                                                            <Box component="span" mr={1} style={{ "backgroundColor": `${colors[row.strategy]}` }} id="dot"></Box>
                                                            <Box component="span">{row.strategy}</Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align="left" id={"noBorder"} style={{ "fontWeight": 700 }}>{parseFloat(row.allocation).toFixed(2)}%</TableCell>
                                                    <TableCell align="left" id={"noBorder"} style={{ "fontWeight": 700 }}>
                                                        <Box display="flex" alignItems="center">
                                                            {parseFloat(row.last24Hr) > 0 && <Box mr={1}>
                                                                <img src={ArrowDropUp} />
                                                            </Box>}
                                                            {parseFloat(row.last24Hr) < 0 && <Box mr={1}>
                                                                <img src={ArrowDropDownIcon} />
                                                            </Box>}
                                                            <Box mr={2} className={parseFloat(row.last24Hr) > 0 ? "positive" : parseFloat(row.last24Hr) < 0 ? "negative" : "positive"}>
                                                                {/* {parseFloat(row.last24Hr) >= 0 ? "+" : "-"} */}
                                                                {value24hour(row.last24Hr)}
                                                                {/* {parseFloat(row.last24Hr) < 0 ? parseFloat(row.last24Hr).toFixed(2).substring(1) : parseFloat(row.last24Hr).toFixed(2)}% */}
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>)
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box> :
                            <Box>
                                {rows.map((row, index) => {
                                    if (parseFloat(row.allocation) !== 0)
                                        return (
                                            <Box key={index} style={{ fontFamily: "OpenSans", fontSize: "14px" }} mb={3}>
                                                <Box display="flex" justifyContent="flex-start" mb={1}>
                                                    <Box mr={2} mt={1} style={{ "backgroundColor": `${colors[row.strategy]}` }} id="dot"></Box>
                                                    <Box mr={2} style={{ color: "#A7A6A6" }}>Strategy</Box>
                                                    <Box>{row.strategy}</Box>
                                                </Box>
                                                <Box display="flex" justifyContent="space-between">
                                                    <Box display="flex" ml={3}>
                                                        <Box mr={1} style={{ color: "#A7A6A6" }}>Allocation</Box>
                                                        <Box style={{ fontWeight: "700" }}>{parseFloat(row.allocation).toFixed(2)}%</Box>
                                                    </Box>
                                                    <Box display="flex" ml={3}>
                                                        <Box mr={1} style={{ color: "#A7A6A6" }}>24 Hr</Box>
                                                        <Box display="flex" alignItems="center">
                                                            {parseFloat(row.last24Hr) > 0 && <Box mr={1}>
                                                                <img src={ArrowDropUp} />
                                                            </Box>}
                                                            {parseFloat(row.last24Hr) < 0 && <Box mr={1}>
                                                                <img src={ArrowDropDownIcon} />
                                                            </Box>}
                                                            <Box mr={2} className={parseFloat(row.last24Hr) > 0 ? "positive" : parseFloat(row.last24Hr) < 0 ? "negative" : "positive"}>
                                                                {/* {parseFloat(row.last24Hr) >= 0 ? "+" : "-"} */}
                                                                {value24hour(row.last24Hr)}
                                                                {/* {parseFloat(row.last24Hr) < 0 ? parseFloat(row.last24Hr).toFixed(2).substring(1) : parseFloat(row.last24Hr).toFixed(2)}% */}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        )
                                })}
                            </Box>}
                    </Grid>
                </>}
            </Grid >
        </Box>
    );
}

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

function Portfolio() {
    const classes = useStyles();
    const [showCurrentBalance, setShowCurrentBalance] = useState(true);
    const [buttonColors, setButtonColors] = useState([true, false, false, false]);
    const [chartData, setChartData] = useState([]);
    const [timestampData, setTimestampData] = useState([]);

    const matches = useMediaQuery('(max-width:600px)')

    const currentBalanceData = useAppSelector((state) => state.strategyPerformance.portfolioAllocation.currentTotalHolding)
    const balancePercentChange = useAppSelector((state) => state.strategyPerformance.portfolioAllocation.totalHoldingChangePercentage)

    const onClick = (index: number) => {
        console.log("onclick")

        let newButtonColors = buttonColors.map((button, i) => {
            if (i === index) {
                return true
            } else {
                return false
            }
        })

        setButtonColors(newButtonColors)
    }

    //useEffect hook for graph
    useEffect(() => {
        const fetchdata = async (period: string) => {
            const response = await getportfolioPerformanceChart(period);
            const portfolioChartData = response.data.data;

            const newChartData = portfolioChartData.map((p: { changePercentage: string, timestamp: string, totalSharesInUsd: string, walletBalance: string }) => parseFloat((parseFloat(p.totalSharesInUsd) + parseFloat(p.walletBalance)).toFixed(3)))
            const newTimestampData = portfolioChartData.map((p: { changePercentage: string, timestamp: string, totalSharesInUsd: string, walletBalance: string }) => (new Date(parseInt(p.timestamp))).toString())

            setChartData(newChartData)
            setTimestampData(newTimestampData)
        }

        let index = buttonColors.findIndex(p => p === true)
        let period = "7d";

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

        // console.log(period)

        fetchdata(period)

    }, [buttonColors])

    return (
        <Box mt={2} sx={{ width: '100%', marginLeft: "38px", marginRight: "30px" }}>
            <Card>
                <CardContent>
                    <Box p={2} mt={1}>
                        <Box className="current-balance"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                            }} mb={3}>
                            Current Balance
                            {showCurrentBalance ? <Box component="span" ml={1} onClick={() => setShowCurrentBalance(!showCurrentBalance)}><VisibilityOffIcon /></Box> :
                                <Box component="span" ml={1} onClick={() => setShowCurrentBalance(!showCurrentBalance)}><VisibilityIcon /></Box>}
                        </Box>
                        {showCurrentBalance && currentBalanceData && <Box className="current-balance-number" mb={1}>
                            ${parseFloat(currentBalanceData).toFixed(2)}
                            <Box mt={3} className={parseFloat(balancePercentChange) >= 0 ? "current-balance-percent-change positive" : "current-balance-percent-change negative"}>
                                {/* {parseFloat(balancePercentChange) >= 0 ? "+" : "-"} */}
                                {parseFloat(balancePercentChange).toFixed(2)}%
                            </Box>
                        </Box>}
                        {showCurrentBalance && !currentBalanceData && <Box className="current-balance-number" mb={1}>
                            $0
                        </Box>}
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
                        <Box>
                            <AreaChart
                                series={[{
                                    name: 'Total Balance in USD',
                                    data: chartData
                                }]}
                                colors={["#76D1BF"]}
                                categories={timestampData}
                                inDollars={true}
                                height={matches ? "150%" : "300%"}
                            />
                        </Box>
                        <Box className="strategy-performance" mt={3} mb={2}>
                            Strategy Performance
                        </Box>
                        <StrategyPerformanceTable />
                        <Box className="strategy-performance" mt={3} mb={2}>
                            Portfolio Allocation
                        </Box>
                        <PortfolioAllocationTable />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Portfolio;