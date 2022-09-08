import {
    Typography,
    Tab,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableHead,
    Box,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Grid, TableBody } from '@mui/material';
import { useEffect, useState } from 'react';

import PieChart from '../PieChart';
import WhiteWrapper from '../WhiteWrapper';
import ArrowDropUp from '../../assets/images/icons/up.svg';
import ArrowDropDownIcon from '../../assets/images/icons/down.svg';

import './product-distribution.scss'

export interface IProductDistribution {
    label: string,
    color: string,
    percentage?: number
    allocation: number
}

function TotalLocked() {
    const [total, setTotal] = useState(6512300)
    const [percentage, setPercentage] = useState(45)

    return <div id="total-locked" className='flex-row flex-space-between flex-align-center'>
        <span className='value-label'>$ {total}</span>
        <span>
            <span className='percent-label'>{percentage} %</span>
            <span className='period-label'>This Week</span>
        </span>
    </div>
}

const useStyles = makeStyles({

    primary: {
        color: "#56E264",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: 'OpenSans'
    },

    error: {
        color: "#E25656",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: 'OpenSans'
    },

    standard: {
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: 'OpenSans'
    },

    tokenName: {
        fontSize: "14px",
        fontWeight: 400,
        fontFamily: 'OpenSans'
    },

    allocation: {
        fontSize: "14px",
        fontWeight: 700,
        fontFamily: 'OpenSans'
    },

    strategyPerformance: {
        fontWeight: 700,
        fontSize: "16px",
        fontFamily: 'OpenSans'
    }
});

function ProductDistribution({ mode = "strategy", labels, series, percentChangeArray }: { mode: string, labels: any[], series: any[], percentChangeArray: any[] }) {

    const classes = useStyles();
    const [header, setHeader] = useState<string[]>([])
    useEffect(() => {
        if (mode === "strategy") {
            setHeader(["Token", "Allocation", "Last 24 Hour"]);
        }
    }, [mode])

    const bulletColors = ['#2E93fA', '#66DA26', '#FEB019', '#E91E63', '#FF9800']

    return <Box mb={2}>
        {/*width temporary*/}
        <Box className={classes.strategyPerformance}>
            Strategy Allocation
        </Box>
        <Grid container direction="row" alignItems={"center"}>
            <Grid item sm={6} xs={12}>
                <PieChart labels={labels} series={series} />
            </Grid>

            <Grid item sm={6} xs={12}>

                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ "border": "none" }} className="table-headings">
                                    Token
                                </TableCell>
                                <TableCell align="left" style={{ "border": "none" }} className="table-headings">
                                    Allocation
                                </TableCell>
                                <TableCell align="left" style={{ "border": "none" }} className="table-headings">
                                    Last 24 Hr
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {labels.map((label, i) => (
                                <TableRow key={i}>
                                    <TableCell component="th" scope="row" className={classes.tokenName} style={{ "border": "none" }}>
                                        <Box display="flex" alignItems="center">
                                            <Box component="span" mr={1} style={{ "backgroundColor": `${bulletColors[i]}` }} id="dot"></Box>
                                            <Box component="span">{label}</Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left" className={classes.allocation} style={{ "border": "none" }}>
                                        {series[i]}%
                                    </TableCell>
                                    <TableCell align="left" className={parseFloat(percentChangeArray[i]) > 0 ? classes.primary : parseFloat(percentChangeArray[i]) < 0 ? classes.error : classes.primary} style={{ "border": "none" }}>
                                        <Box display="flex" alignItems="center">
                                            {parseFloat(percentChangeArray[i]) > 0 && <Box mr={1}>
                                                <img src={ArrowDropUp} />
                                            </Box>}
                                            {parseFloat(percentChangeArray[i]) < 0 && <Box mr={1}>
                                                <img src={ArrowDropDownIcon} />
                                            </Box>}
                                            <Box>
                                                {parseFloat(percentChangeArray[i]) < 0 ? parseFloat(percentChangeArray[i]).toFixed(2).substring(1) : parseFloat(percentChangeArray[i]).toFixed(2)}%
                                            </Box>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </Box>
}

export default ProductDistribution