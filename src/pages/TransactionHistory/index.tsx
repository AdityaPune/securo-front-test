import {
  Grid,
  Box,
  Card,
  Button,
  createTheme,
  ThemeProvider,
  MenuItem,
  FormControl,
  InputLabel,
  Collapse,
  useMediaQuery,
  Typography,
  Select,
} from "@mui/material";
import { CardContent } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";
import { Theme } from "@mui/material/styles";
import { CSVLink, CSVDownload } from "react-csv";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import TextField from "@mui/material/TextField";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Deposit from "../../assets/images/Deposit/DEPOSIT.svg";
import DepositIcon from "../../assets/images/icons/depositicon.svg";
import WithdrawIcon from "../../assets/images/icons/withdrawicon.svg";
import BNIDeposit from "../../assets/images/Deposit/BNI.svg";
import MWIDeposit from "../../assets/images/Deposit/MWI.svg";
import LCIDeposit from "../../assets/images/Deposit/LCI.svg";

import Withdraw from "../../assets/images/Withdrawal/WITHDRAW.svg";
import BNIWithdraw from "../../assets/images/Withdrawal/BNI.svg";
import MWIWithdraw from "../../assets/images/Withdrawal/MWI.svg";
import LCIWithdraw from "../../assets/images/Withdrawal/LCI.svg";

import CalendarIcon from "../../components/CalendarIcon";

import "./styles.scss";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    width: "100%",
    fontFamily: "OpenSans",
  },

  data: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#454545",
  },
  amount: {
    fontSize: "16px",
    fontWeight: 400,
    color: "#454545",
  },
  sideHeadings: {
    color: "#B0B0B0",
    fontSize: "16px",
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  searchButton: {
    height: "40px",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: 700,
    "&:hover": {
      border: "none",
    },
  },
  disabledButton: {
    height: "40px",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: 700,
    "&:hover": {
      border: "none",
    },
  },
  exportButton: {
    height: "40px",
    borderRadius: "14px",
    fontSize: "14px",
    fontWeight: 700,
    border: "2px solid #76D1BF",
    color: "#76D1BF",
    "&:hover": {
      backgroundColor: "#eaf6f6",
      boxShadow: "2px 2px 1px rgba(0, 0, 0, 0.2)",
      color: "#dcf3f",
      border: "2px solid #dcf3f",
    },
  },
  time: {
    color: "#B0B0B0",
    fontSize: "14px",
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
    },
  },
  boxBorder: {
    borderTop: "1px solid rgba(0, 0, 0, 0.2)",
    paddingTop: "20px",
  },
  successful: {
    width: "121px",
    height: "36px",
    backgroundColor: "#DCF3EF",
    borderRadius: "10px",
    color: "#76D1BF",
    fontWeight: 700,
  },
  pending: {
    width: "121px",
    height: "36px",
    backgroundColor: "#CCCCCC",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: 700,
  },
  failed: {
    width: "121px",
    height: "36px",
    backgroundColor: "#FFBEBE",
    borderRadius: "10px",
    color: "#fff",
    fontWeight: 700,
  },
  imgStyles: {
    [theme.breakpoints.down("sm")]: {
      width: "30px",
    },
  },
  dropdown: {
    [theme.breakpoints.down("sm")]: {
      width: "20px",
      height: "20px",
    },
  },
  collapseSearch: {
    color: "#76D1BF",
    textDecoration: "underline",
    fontWeight: 700,
  },
}));

const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "40px",
          boxSizing: "border-box",
          borderRadius: "14px",
          backgroundColor: "rgba(118, 209, 191, 0.25)",
          paddingLeft: "15px",
          paddingTop: "3px",
          paddingRight: "10px",
          color: "black",
          // fontWeight: 700,
          fontSize: "14px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(0,0,0,0.45)",
          fontSize: "14px",
          paddingTop: "3px",
        },
      },
    },
    // MuiMenu: {
    //     styleOverrides: {
    //         root: {
    //             width: "100px"
    //         }
    //     }
    // },
  },
});

const themeDate = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          height: "40px",
          boxSizing: "border-box",
          borderRadius: "14px",
          backgroundColor: "rgba(118, 209, 191, 0.25)",
          paddingLeft: "15px",
          paddingTop: "3px",
          paddingRight: "10px",
          color: "black",
          // fontWeight: 700,
          fontSize: "14px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(0,0,0,0.45)",
          fontSize: "14px",
          paddingTop: "6px",
          paddingLeft: "10px",
        },
      },
    },
  },
});

const Dropdown = (props: any) => {
  const [expandMore, setExpandMore] = useState(false);
  const classes = useStyles();

  const matches = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (matches) {
      setExpandMore(true);
    }
  }, [matches]);

  return (
    <>
      {!matches && (
        <Grid item xs={1} sm={2}>
          {props.obj.actionType === "DEPOSIT" ? (
            <Box
              display="flex"
              justifyContent="flex-end"
              onClick={() => setExpandMore(!expandMore)}
              mt={1.5}
            >
              {expandMore && (
                <ExpandLessIcon
                  fontSize="large"
                  style={{ color: "#76D1BF", cursor: "pointer" }}
                  className={classes.dropdown}
                />
              )}
              {!expandMore && (
                <ExpandMoreIcon
                  fontSize="large"
                  style={{ color: "#76D1BF", cursor: "pointer" }}
                  className={classes.dropdown}
                />
              )}
            </Box>
          ) : (
            <Box
              display="flex"
              justifyContent="flex-end"
              onClick={() => setExpandMore(!expandMore)}
            >
              {expandMore && (
                <ExpandLessIcon
                  fontSize="large"
                  style={{ color: "#76D1BF", cursor: "pointer" }}
                  className={classes.dropdown}
                />
              )}
              {!expandMore && (
                <ExpandMoreIcon
                  fontSize="large"
                  style={{ color: "#76D1BF", cursor: "pointer" }}
                  className={classes.dropdown}
                />
              )}
            </Box>
          )}
        </Grid>
      )}
      {expandMore && (
        <Grid container>
          <Grid item xs={12}>
            <Box
              className={classes.data}
              mt={3}
              sx={!matches ? { ml: { xs: 6, sm: 8 } } : { ml: 0 }}
              mb={1}
            >
              <Box component="span" className={classes.sideHeadings} mr={1}>
                Category:
              </Box>
              <Box style={matches ? { fontSize: "14px" } : {}} component="span">
                {props.obj.transactionCategory.charAt(0).toUpperCase() +
                  props.obj.transactionCategory.slice(1).toLowerCase()}
              </Box>
            </Box>
            {props.obj.transactionDetails.map(
              (transactionDetail: any, i: number) => {
                if (
                  props.obj.transactionCategory === "PRODUCT" &&
                  (transactionDetail.interactionType === "MINTING" ||
                    transactionDetail.interactionType === "BURNING")
                ) {
                  return (
                    // <Box>{new Date(transactionDetail.createAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</Box>
                    <Box
                      sx={!matches ? { ml: { xs: 6, sm: 8 } } : { ml: 0 }}
                      mb={2}
                      key={i}
                    >
                      <Box className={classes.data} mt={1}>
                        <Box
                          className={classes.sideHeadings}
                          mr={1}
                          component={matches ? "div" : "span"}
                        >
                          Strategy:
                        </Box>
                        {props.obj.product &&
                          props.obj.product.symbol === "MWI" && (
                            <Box component="span">
                              <a
                                style={
                                  matches
                                    ? {
                                        color: "#76D1BF",
                                        wordWrap: "break-word",
                                        fontSize: "14px",
                                      }
                                    : {
                                        color: "#76D1BF",
                                        wordWrap: "break-word",
                                      }
                                }
                                href="https://snowtrace.io/address/0x5aCBd5b82edDae114EC0703c86d163bD0107367c"
                                target="blank"
                              >
                                0x5aCBd5b82edDae114EC0703c86d163bD0107367c
                              </a>
                            </Box>
                          )}
                        {props.obj.product &&
                          props.obj.product.symbol === "LCI" && (
                            <Box component="span">
                              <a
                                style={
                                  matches
                                    ? {
                                        color: "#76D1BF",
                                        wordWrap: "break-word",
                                        fontSize: "14px",
                                      }
                                    : {
                                        color: "#76D1BF",
                                        wordWrap: "break-word",
                                      }
                                }
                                href="https://bscscan.com/address/0x8FD52c2156a0475e35E0FEf37Fa396611062c9b6"
                                target="blank"
                              >
                                0x8FD52c2156a0475e35E0FEf37Fa396611062c9b6
                              </a>
                            </Box>
                          )}
                        {props.obj.product &&
                          props.obj.product.symbol === "BNI" && (
                            <Box component="span">
                              <a
                                style={
                                  matches
                                    ? {
                                        color: "#76D1BF",
                                        wordWrap: "break-word",
                                        fontSize: "14px",
                                      }
                                    : {
                                        color: "#76D1BF",
                                        wordWrap: "break-word",
                                      }
                                }
                                href="https://snowtrace.io/address/0x52942c46F355aC354CFdeF72fd96b41eE10D7C72"
                                target="blank"
                              >
                                0x52942c46F355aC354CFdeF72fd96b41eE10D7C72
                              </a>
                            </Box>
                          )}
                      </Box>
                      <Box className={classes.data} mt={1}>
                        <Box
                          className={classes.sideHeadings}
                          mr={1}
                          component={matches ? "div" : "span"}
                        >
                          Transaction Hash:
                        </Box>
                        <Box component="span">
                          <a
                            style={
                              matches
                                ? {
                                    color: "#76D1BF",
                                    wordWrap: "break-word",
                                    fontSize: "14px",
                                  }
                                : { color: "#76D1BF", wordWrap: "break-word" }
                            }
                            href={transactionDetail.detail.url}
                            target="blank"
                          >
                            {transactionDetail.detail.transactionHash}
                          </a>
                        </Box>
                      </Box>
                      {transactionDetail.detail.share && (
                        <Box className={classes.data} display="flex" mt={1}>
                          <Box className={classes.sideHeadings} mr={1}>
                            Share Amount:
                          </Box>
                          <Box style={matches ? { fontSize: "14px" } : {}}>
                            {parseFloat(transactionDetail.detail.share).toFixed(
                              4
                            )}{" "}
                            {props.obj.product.symbol}
                          </Box>
                        </Box>
                      )}
                      {
                        <Box className={classes.data} display="flex" mt={1}>
                          <Box className={classes.sideHeadings} mr={1}>
                            Gas Fees:
                          </Box>
                          <Box style={matches ? { fontSize: "14px" } : {}}>
                            {/* {parseFloat(transactionDetail.detail.gasFee).toFixed(4)} */}
                            {(() => {
                              let returnValue = 0;
                              for (
                                let i = 0;
                                i < props.obj.transactionDetails.length;
                                i++
                              ) {
                                if (
                                  props.obj.transactionDetails[i]
                                    .interactionType === "MINTING" ||
                                  props.obj.transactionDetails[i]
                                    .interactionType === "BURNING"
                                ) {
                                  returnValue =
                                    parseFloat(
                                      props.obj.transactionDetails[i].detail
                                        .gasFee
                                    ) *
                                    parseFloat(
                                      props.obj.transactionDetails[i].detail
                                        .nativeTokenPriceInUsd
                                    );
                                }
                              }
                              return returnValue.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                style: "currency",
                                currency: "USD",
                              });
                            })()}
                          </Box>
                        </Box>
                      }
                    </Box>
                  );
                }

                if (props.obj.transactionCategory === "WALLET") {
                  return (
                    <Box
                      sx={!matches ? { ml: { xs: 6, sm: 8 } } : { ml: 0 }}
                      mb={1}
                      key={i}
                    >
                      <Box className={classes.data} display="flex" mb={1}>
                        <Box className={classes.sideHeadings} mr={1}>
                          Payment:
                        </Box>
                        <Box style={matches ? { fontSize: "14px" } : {}}>
                          {transactionDetail.detail.paymentMethod === "O"
                            ? "Online Banking"
                            : ""}
                        </Box>
                      </Box>
                      <Box className={classes.data} display="flex">
                        <Box className={classes.sideHeadings} mr={1}>
                          Reference Number:
                        </Box>
                        <Box style={matches ? { fontSize: "14px" } : {}}>
                          {transactionDetail.detail.referenceNumber}
                        </Box>
                      </Box>
                    </Box>
                  );
                }
              }
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};

const TransactionHistory = () => {
  const classes = useStyles();
  const [showCurrentBalance, setShowCurrentBalance] = useState(true);
  const currentBalanceData = useAppSelector(
    (state) => state.strategyPerformance.portfolioAllocation.currentTotalHolding
  );
  const balancePercentChange = useAppSelector(
    (state) =>
      state.strategyPerformance.portfolioAllocation.totalHoldingChangePercentage
  );
  const userData = useAppSelector((state) => state.user.userData);

  // console.log("user", userData)

  const [transactionHash, setTransactionHash] = useState("");
  const [strategy, setStrategy] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [status, setStatus] = useState("");

  const matches = useMediaQuery("(max-width:600px)");

  // const [type, setType] = useState('text');
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  //const [open, setOpen] = useState(false)

  // const [exportArray, setExportArray] = useState<any[]>([]);
  let expArray = new Array();

  interface ISearch {
    strategyValue: string;
    transactionTypeValue: string;
    statusValue: string;
    transactionHashValue: string;
    fromDateValue: Date | null;
    toDatevalue: Date | null;
  }

  const [searchValue, setSearchValue] = useState({
    strategyValue: "",
    transactionTypeValue: "",
    statusValue: "",
    transactionHashValue: "",
    fromDateValue: null,
    toDatevalue: null,
  } as ISearch);

  const [collapse, setCollapse] = useState(false);

  const handleSearch = () => {
    setSearchValue((val) => ({
      ...val,
      strategyValue: strategy,
      transactionTypeValue: transactionType,
      dateValue: date,
      statusValue: status,
      transactionHashValue: transactionHash,
      fromDateValue: fromDate,
      toDatevalue: toDate,
    }));
  };

  const transactions = useAppSelector(
    (state) => state.recentTransaction.recentTransactionData
  );

  const dateArr = transactions.map((t) =>
    new Date(t.createAt).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  const uniqueDateArr = dateArr.filter(
    (item, i, arr) => arr.indexOf(item) === i
  );

  let transactionObjs = new Array();

  uniqueDateArr.forEach((obj, i) => {
    let arr = new Array();
    transactions.forEach((t, j) => {
      if (
        new Date(t.createAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) === obj
      ) {
        arr.push(t);
      }
    });
    arr.reverse();
    transactionObjs.push(arr);
  });

  transactionObjs.reverse();
  uniqueDateArr.reverse();
  // console.log("transObj", transactionObjs)

  const handleTransactionChange = (event: any) => {
    // let target = event.target as HTMLInputElement;
    setTransactionType(event.target.value);
  };

  return (
    // <Box mt={2} mx={2} sx={{ width: '100%', fontFamily: "OpenSans" }}>
    <div className="transaction-container">
      <div className="header">
        <div className="balance">
          <Typography className="wallet-balance">
            Current Wallet Balance
          </Typography>
          {showCurrentBalance && currentBalanceData && userData && (
            <Typography className="amount">
              ${parseFloat(userData.walletBalance).toFixed(2)}
            </Typography>
          )}
          {showCurrentBalance && !currentBalanceData && (
            <Typography className="amount">$0</Typography>
          )}
        </div>
        <div className="actions">
          <div className="deposit">
            <img src={DepositIcon} />
            Deposit
          </div>
          <div className="withdraw">
            <img src={WithdrawIcon} />
            Withdraw
          </div>
          <div className="export">Export</div>
        </div>
      </div>
      <div className="search-content">
        <div className="type">
          <FormControl sx={{ m: 1, minWidth: 200, borderRadius: "8px" }}>
            <InputLabel>Transaction Type</InputLabel>
            <Select
              labelId="order"
              id="transaction-type-select"
              value={transactionType}
              className="select"
              onChange={handleTransactionChange}
              label="Transaction Type"
              style={{ color: "#000" }}
            >
              <MenuItem value={"Deposit"} className="menu">
                Deposit
              </MenuItem>
              <MenuItem value={"Withdraw"} className="menu">
                Withdraw
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="date">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              label="From"
              components={{
                OpenPickerIcon: CalendarIcon,
              }}
              value={fromDate}
              onChange={(newValue) => {
                setDate(newValue);
                setFromDate(newValue);
                setToDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className="status">
          <FormControl sx={{ m: 1, minWidth: 200, borderRadius: "8px" }}>
            <InputLabel>Status</InputLabel>
            <Select
              labelId="order"
              id="status-type-select"
              className="select"
              onChange={(e) => setStatus(e.target.value)}
              value={status}
              label="Status"
              style={{ color: "#000" }}
            >
              <MenuItem value={"Completed"} className="menu">
                Completed
              </MenuItem>
              <MenuItem value={"Pending"} className="menu">
                Pending
              </MenuItem>
              <MenuItem value={"Failed"} className="menu">
                Failed
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="strategy">
          <FormControl sx={{ m: 1, minWidth: 200, borderRadius: "8px" }}>
            <InputLabel>Strategy</InputLabel>
            <Select
              labelId="order"
              id="status-type-select"
              className="select"
              onChange={(e) => setStrategy(e.target.value)}
              value={strategy}
              label="Strategy"
              style={{ color: "#000" }}
            >
              <MenuItem value={"LCI"} className="menu">
                LCI
              </MenuItem>
              <MenuItem value={"MWI"} className="menu">
                MWI
              </MenuItem>
              <MenuItem value={"BNI"} className="menu">
                BNI
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="transaction">
          <FormControl sx={{ m: 1, minWidth: 200, borderRadius: "8px" }}>
            <TextField
              id="status-type-select"
              className="select"
              onChange={(e) => setTransactionHash(e.target.value)}
              value={transactionHash}
              label="Transaction Hash"
              style={{ color: "#000" }}
            ></TextField>
          </FormControl>
        </div>
        <div className="search">
          <Typography className="search-button">Search</Typography>
        </div>
      </div>
      <Box
        mt={2}
        className={classes.container}
        style={{ marginLeft: "38px", marginRight: "30px", overflow: "auto" }}
      >
        <Card>
          <CardContent>
            <Box p={2} mt={1}>
              <Box
                className="current-balance"
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
                mb={3}
              >
                Wallet Balance
                {showCurrentBalance ? (
                  <Box
                    component="span"
                    ml={1}
                    onClick={() => setShowCurrentBalance(!showCurrentBalance)}
                  >
                    <VisibilityOffIcon />
                  </Box>
                ) : (
                  <Box
                    component="span"
                    ml={1}
                    onClick={() => setShowCurrentBalance(!showCurrentBalance)}
                  >
                    <VisibilityIcon />
                  </Box>
                )}
              </Box>
              {showCurrentBalance && currentBalanceData && userData && (
                <Box className="current-balance-number" mb={5}>
                  ${parseFloat(userData.walletBalance).toFixed(2)}
                  <Box
                    mt={3}
                    className={
                      parseFloat(balancePercentChange) >= 0
                        ? "current-balance-percent-change positive"
                        : "current-balance-percent-change negative"
                    }
                  >
                    {parseFloat(balancePercentChange).toFixed(2)}%
                  </Box>
                </Box>
              )}
              {showCurrentBalance && !currentBalanceData && (
                <Box className="current-balance-number" mb={5}>
                  $0
                </Box>
              )}
              <Box mb={3}>
                <Card style={{ borderRadius: "25px" }}>
                  <Box p={3}>
                    <Grid container spacing={2}>
                      <Grid item md={4} xs={12}>
                        <Box mb={1}>Transaction Type</Box>
                        <ThemeProvider theme={theme}>
                          <FormControl fullWidth>
                            {transactionType === "" && (
                              <InputLabel htmlFor="transactionType">
                                Select Transaction Type
                              </InputLabel>
                            )}
                            <TextField
                              variant="standard"
                              id="transactionType"
                              fullWidth
                              onChange={(e) =>
                                setTransactionType(e.target.value)
                              }
                              value={transactionType}
                              InputProps={{
                                disableUnderline: true,
                              }}
                              margin="dense"
                              select
                            >
                              <MenuItem value="">
                                Select Transaction Type
                              </MenuItem>
                              <MenuItem value="DEPOSIT">Deposit</MenuItem>
                              <MenuItem value="WITHDRAW">Withdraw</MenuItem>
                            </TextField>
                          </FormControl>
                        </ThemeProvider>
                      </Grid>
                      <Grid item md={5} xs={12}>
                        {/* Date
                                            {console.log("date", date)}
                                            <ThemeProvider theme={theme}>
                                                <TextField
                                                    placeholder="Select Date"
                                                    variant="standard"
                                                    fullWidth
                                                    onChange={(e) => setDate(e.target.value)}
                                                    value={date}
                                                    InputProps={{
                                                        disableUnderline: true
                                                    }}
                                                    type={type}
                                                    onFocus={() => setType('date')}
                                                    onBlur={() => setType('text')}
                                                    margin="dense"
                                                    id={date !== "" ? 'date-input--has-value' : 'date-input--has-no-value'}
                                                />
                                            </ThemeProvider> */}
                        <ThemeProvider theme={themeDate}>
                          Select Date Range
                          <Grid container spacing={1}>
                            <Grid item xs={6}>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DatePicker
                                  label="From"
                                  components={{
                                    OpenPickerIcon: CalendarIcon,
                                  }}
                                  value={fromDate}
                                  onChange={(newValue) => {
                                    setDate(newValue);
                                    setFromDate(newValue);
                                  }}
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                  // open={open}
                                  // onOpen={() => setOpen(true)}
                                  // onClose={() => setOpen(false)}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="standard"
                                      fullWidth
                                    />
                                  )}
                                  PopperProps={{
                                    placement: "bottom",
                                  }}
                                  desktopModeMediaQuery={theme.breakpoints.up(
                                    "xs"
                                  )}
                                  //maxDate={toDate !== null ? toDate : null}
                                />
                                <Box
                                  style={{ fontSize: "12px", color: "#EB4747" }}
                                  ml={1}
                                >
                                  {toDate !== null && fromDate === null
                                    ? "Please enter date"
                                    : ""}
                                </Box>
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <DatePicker
                                  label="To"
                                  components={{
                                    OpenPickerIcon: CalendarIcon,
                                  }}
                                  value={toDate}
                                  onChange={(newValue) => {
                                    setToDate(newValue);
                                  }}
                                  // open={open}
                                  // onOpen={() => setOpen(true)}
                                  // onClose={() => setOpen(false)}
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      variant="standard"
                                      fullWidth
                                      // required={fromDate !== null ? true : false}
                                    />
                                  )}
                                  PopperProps={{
                                    placement: "bottom-start",
                                  }}
                                  desktopModeMediaQuery={theme.breakpoints.up(
                                    "xs"
                                  )}
                                  // minDate={fromDate !== null && date !== null ? (new Date((date.setDate(date.getDate() + 1)))) : null}
                                  minDate={fromDate !== null ? fromDate : null}
                                />
                                <Box
                                  style={{ fontSize: "12px", color: "#EB4747" }}
                                  ml={1}
                                >
                                  {fromDate !== null && toDate === null
                                    ? "Please enter date"
                                    : ""}
                                </Box>
                              </LocalizationProvider>
                            </Grid>
                          </Grid>
                        </ThemeProvider>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <Box mb={1}>Status</Box>
                        <ThemeProvider theme={theme}>
                          <FormControl fullWidth>
                            {status === "" && (
                              <InputLabel htmlFor="transactionStatus">
                                Select Status
                              </InputLabel>
                            )}
                            <TextField
                              id="transactionStatus"
                              variant="standard"
                              fullWidth
                              onChange={(e) => setStatus(e.target.value)}
                              value={status}
                              InputProps={{
                                disableUnderline: true,
                              }}
                              margin="dense"
                              select
                            >
                              <MenuItem value="">Select Status</MenuItem>
                              <MenuItem value="S">Completed</MenuItem>
                              <MenuItem value="F">Failed</MenuItem>
                              <MenuItem value="P">Pending</MenuItem>
                            </TextField>
                          </FormControl>
                        </ThemeProvider>
                      </Grid>
                      {collapse && (
                        <Grid item md={6} xs={12}>
                          <Box mb={1} mt={1}>
                            Strategy
                          </Box>
                          <ThemeProvider theme={theme}>
                            <FormControl fullWidth>
                              {strategy === "" && (
                                <InputLabel htmlFor="Strategy">
                                  Select Strategy
                                </InputLabel>
                              )}
                              <TextField
                                variant="standard"
                                fullWidth
                                onChange={(e) => setStrategy(e.target.value)}
                                value={strategy}
                                InputProps={{ disableUnderline: true }}
                                margin="dense"
                                id="strategy"
                                select
                              >
                                <MenuItem value="">Select Strategy</MenuItem>
                                <MenuItem value="LCI">LCI</MenuItem>
                                <MenuItem value="MWI">MWI</MenuItem>
                                <MenuItem value="BNI">BNI</MenuItem>
                              </TextField>
                            </FormControl>
                          </ThemeProvider>
                        </Grid>
                      )}
                      {collapse && (
                        <Grid item md={6} xs={12}>
                          <Box mb={1} mt={1}>
                            Transaction Hash
                          </Box>
                          <ThemeProvider theme={theme}>
                            <TextField
                              placeholder="Select Transaction Hash"
                              variant="standard"
                              fullWidth
                              onChange={(e) =>
                                setTransactionHash(e.target.value)
                              }
                              value={transactionHash}
                              InputProps={{
                                disableUnderline: true,
                              }}
                              margin="dense"
                            />
                          </ThemeProvider>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Grid container direction="row-reverse" spacing={1}>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            order={{ xs: 3, sm: 1 }}
                          >
                            <Box
                              mt={1}
                              sx={{ ml: { xs: 0, md: 2 } }}
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <CSVLink
                                data={expArray}
                                style={{
                                  color: "inherit",
                                  textDecoration: "none",
                                  width: "100%",
                                }}
                                filename={
                                  "transaction_history_" +
                                  userData.emailAddress +
                                  ".csv"
                                }
                              >
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  className={classes.exportButton}
                                  fullWidth
                                >
                                  Export
                                </Button>
                              </CSVLink>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            order={{ xs: 2, sm: 2 }}
                          >
                            <Box
                              mt={1}
                              sx={{ ml: { xs: 0, md: 2 } }}
                              display="flex"
                              justifyContent="flex-end"
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                className={
                                  fromDate !== null && toDate === null
                                    ? classes.disabledButton
                                    : classes.searchButton
                                }
                                fullWidth
                                onClick={handleSearch}
                                // disabled={fromDate !== null && toDate === null ? true : false}
                                // classes={{ disabled: classes.disabledButton }}
                              >
                                Search
                              </Button>
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={4}
                            md={3}
                            order={{ xs: 1, sm: 3 }}
                          >
                            <a
                              onClick={() => setCollapse(!collapse)}
                              style={{ cursor: "pointer" }}
                            >
                              <Box
                                display="flex"
                                justifyContent={matches ? "center" : "flex-end"}
                                mt={2}
                                className={classes.collapseSearch}
                              >
                                {collapse
                                  ? "Collapse Search"
                                  : "Advance Search"}
                              </Box>
                            </a>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Card>
              </Box>
              {uniqueDateArr &&
                uniqueDateArr.map((t, i) => {
                  let time = "";
                  let boolVal = false;
                  return (
                    <Box mb={8} key={i}>
                      <Box>
                        {transactionObjs[i]
                          .filter((obj: any) => {
                            if (
                              obj &&
                              searchValue.transactionTypeValue ===
                                obj.actionType
                            ) {
                              return obj;
                            }
                            if (searchValue.transactionTypeValue === "") {
                              return obj;
                            }
                          })
                          .filter((obj: any) => {
                            if (
                              obj &&
                              obj.product &&
                              searchValue.strategyValue.toUpperCase() ===
                                obj.product.symbol
                            ) {
                              return obj;
                            }
                            if (
                              searchValue.strategyValue.toUpperCase() === ""
                            ) {
                              return obj;
                            }
                          })
                          .filter((obj: any) => {
                            if (
                              obj &&
                              searchValue.fromDateValue &&
                              searchValue.toDatevalue &&
                              searchValue.fromDateValue?.getTime() <=
                                new Date(obj.createAt).getTime() &&
                              searchValue.toDatevalue?.getTime() >=
                                new Date(obj.createAt).getTime()
                            ) {
                              return obj;
                            }

                            if (
                              !searchValue.fromDateValue &&
                              !searchValue.toDatevalue
                            ) {
                              return obj;
                            }
                          })
                          .filter((obj: any) => {
                            if (obj && searchValue.statusValue === obj.status) {
                              return obj;
                            }
                            if (searchValue.statusValue === "") {
                              return obj;
                            }
                          })
                          .filter((obj: any) => {
                            if (searchValue.transactionHashValue === "") {
                              return obj;
                            }

                            let objectToReturn = "";

                            obj.transactionDetails.forEach((element: any) => {
                              if (
                                element.detail.transactionHash &&
                                element.detail.transactionHash ===
                                  searchValue.transactionHashValue
                              ) {
                                objectToReturn = obj;
                              }
                            });

                            return objectToReturn;
                          })
                          .map((obj: any, j: number) => {
                            expArray.push({
                              "Created At": t,
                              Time: new Date(obj.createAt)
                                .toLocaleTimeString(undefined, { hour12: true })
                                .toUpperCase(),
                              Strategy: (function () {
                                if (obj.product) {
                                  return obj.product.symbol;
                                } else {
                                  return "WALLET";
                                }
                              })(),
                              Type: obj.actionType,
                              Status: (function () {
                                if (obj.status === "P") {
                                  return "Pending";
                                } else if (obj.status === "F") {
                                  return "Failed";
                                } else {
                                  return "Completed";
                                }
                              })(),
                              Amount: (function () {
                                if (obj.actionType === "DEPOSIT") {
                                  return parseFloat(obj.amount).toLocaleString(
                                    "en-US",
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                      style: "currency",
                                      currency: "USD",
                                    }
                                  );
                                } else {
                                  return (
                                    "-" +
                                    parseFloat(obj.amount).toLocaleString(
                                      "en-US",
                                      {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                        style: "currency",
                                        currency: "USD",
                                      }
                                    )
                                  );
                                }
                              })(),
                              "Transaction Hash": (function () {
                                for (
                                  let i = 0;
                                  i < obj.transactionDetails.length;
                                  i++
                                ) {
                                  if (
                                    obj.transactionCategory === "PRODUCT" &&
                                    (obj.transactionDetails[i]
                                      .interactionType === "MINTING" ||
                                      obj.transactionDetails[i]
                                        .interactionType === "BURNING")
                                  ) {
                                    return obj.transactionDetails[i].detail
                                      .transactionHash;
                                  }
                                }
                              })(),
                              "Share Amount": (function () {
                                for (
                                  let i = 0;
                                  i < obj.transactionDetails.length;
                                  i++
                                ) {
                                  if (
                                    obj.transactionCategory === "PRODUCT" &&
                                    (obj.transactionDetails[i]
                                      .interactionType === "MINTING" ||
                                      obj.transactionDetails[i]
                                        .interactionType === "BURNING")
                                  ) {
                                    return (
                                      parseFloat(
                                        obj.transactionDetails[i].detail.share
                                      ).toFixed(4) +
                                      " " +
                                      obj.product.symbol
                                    );
                                  }
                                }
                              })(),
                              "Gas Fees": (function () {
                                if (obj.transactionCategory === "WALLET") {
                                  return "";
                                }
                                let returnValue = 0;
                                for (
                                  let i = 0;
                                  i < obj.transactionDetails.length;
                                  i++
                                ) {
                                  if (
                                    obj.transactionDetails[i]
                                      .interactionType === "MINTING" ||
                                    obj.transactionDetails[i]
                                      .interactionType === "BURNING"
                                  )
                                    returnValue =
                                      parseFloat(
                                        obj.transactionDetails[i].detail.gasFee
                                      ) *
                                      parseFloat(
                                        obj.transactionDetails[i].detail
                                          .nativeTokenPriceInUsd
                                      );
                                }
                                return returnValue.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                  style: "currency",
                                  currency: "USD",
                                });
                              })(),
                              "Payment Method": (function () {
                                for (
                                  let i = 0;
                                  i < obj.transactionDetails.length;
                                  i++
                                ) {
                                  if (obj.transactionCategory === "WALLET") {
                                    return obj.transactionDetails[i].detail
                                      .paymentMethod;
                                  }
                                }
                              })(),
                              "Reference Number": (function () {
                                for (
                                  let i = 0;
                                  i < obj.transactionDetails.length;
                                  i++
                                ) {
                                  if (obj.transactionCategory === "WALLET") {
                                    return obj.transactionDetails[i].detail
                                      .referenceNumber;
                                  }
                                }
                              })(),
                            });
                            let newTime = new Date(
                              obj.createAt
                            ).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            });
                            if (time !== newTime) {
                              time = newTime;
                              boolVal = true;
                            } else {
                              boolVal = false;
                            }
                            if (!matches)
                              return (
                                <Box key={j}>
                                  {boolVal && (
                                    <Box mb={1} className={classes.data}>
                                      {t}
                                    </Box>
                                  )}
                                  <Box mb={2} className={classes.boxBorder}>
                                    <Grid container spacing={1}>
                                      <Grid item xs={5} sm={4}>
                                        <Box display="flex" alignItems="center">
                                          {(() => {
                                            if (
                                              obj.transactionCategory ===
                                              "WALLET"
                                            ) {
                                              if (obj.actionType === "DEPOSIT")
                                                return (
                                                  <Box mr={1.5}>
                                                    <img
                                                      src={Deposit}
                                                      className={
                                                        classes.imgStyles
                                                      }
                                                    />
                                                  </Box>
                                                );
                                              if (obj.actionType === "WITHDRAW")
                                                return (
                                                  <Box mr={1.5}>
                                                    <img
                                                      src={Withdraw}
                                                      className={
                                                        classes.imgStyles
                                                      }
                                                    />
                                                  </Box>
                                                );
                                            } else {
                                              if (
                                                obj.actionType === "DEPOSIT" &&
                                                obj.product.symbol === "MWI"
                                              )
                                                return (
                                                  <Box mr={1.5}>
                                                    <img
                                                      src={MWIDeposit}
                                                      className={
                                                        classes.imgStyles
                                                      }
                                                    />
                                                  </Box>
                                                );
                                              if (
                                                obj.actionType === "WITHDRAW" &&
                                                obj.product.symbol === "MWI"
                                              )
                                                return (
                                                  <Box mr={1.5}>
                                                    <img
                                                      src={MWIWithdraw}
                                                      className={
                                                        classes.imgStyles
                                                      }
                                                    />
                                                  </Box>
                                                );
                                              if (
                                                obj.actionType === "DEPOSIT" &&
                                                obj.product.symbol === "BNI"
                                              )
                                                return (
                                                  <Box mr={1.5}>
                                                    <img
                                                      src={BNIDeposit}
                                                      className={
                                                        classes.imgStyles
                                                      }
                                                    />
                                                  </Box>
                                                );
                                              if (
                                                obj.actionType === "WITHDRAW" &&
                                                obj.product.symbol === "BNI"
                                              )
                                                return (
                                                  <Box mr={1.5}>
                                                    <img
                                                      src={BNIWithdraw}
                                                      className={
                                                        classes.imgStyles
                                                      }
                                                    />
                                                  </Box>
                                                );
                                              if (
                                                obj.actionType === "DEPOSIT" &&
                                                obj.product.symbol === "LCI"
                                              )
                                                return (
                                                  <Box mr={1.5}>
                                                    <img
                                                      src={LCIDeposit}
                                                      className={
                                                        classes.imgStyles
                                                      }
                                                    />
                                                  </Box>
                                                );
                                              if (
                                                obj.actionType === "WITHDRAW" &&
                                                obj.product.symbol === "LCI"
                                              )
                                                return (
                                                  <Box mr={1.5}>
                                                    <img
                                                      src={LCIWithdraw}
                                                      className={
                                                        classes.imgStyles
                                                      }
                                                    />
                                                  </Box>
                                                );
                                            }
                                          })()}
                                          <Box>
                                            {(() => {
                                              if (
                                                obj.transactionCategory ===
                                                "WALLET"
                                              ) {
                                                if (
                                                  obj.actionType === "DEPOSIT"
                                                )
                                                  return (
                                                    <Box mt={1.5}>
                                                      Wallet Balance Top up
                                                    </Box>
                                                  );
                                                if (
                                                  obj.actionType === "WITHDRAW"
                                                )
                                                  return (
                                                    <Box>
                                                      Withdraw from Wallet
                                                    </Box>
                                                  );
                                              } else {
                                                if (
                                                  obj.actionType ===
                                                    "DEPOSIT" &&
                                                  obj.product.symbol === "MWI"
                                                )
                                                  return (
                                                    <Box mt={1.5}>
                                                      Deposit to MWI
                                                    </Box>
                                                  );
                                                if (
                                                  obj.actionType ===
                                                    "WITHDRAW" &&
                                                  obj.product.symbol === "MWI"
                                                )
                                                  return (
                                                    <Box>Withdraw from MWI</Box>
                                                  );
                                                if (
                                                  obj.actionType ===
                                                    "DEPOSIT" &&
                                                  obj.product.symbol === "BNI"
                                                )
                                                  return (
                                                    <Box mt={1.5}>
                                                      Deposit to BNI
                                                    </Box>
                                                  );
                                                if (
                                                  obj.actionType ===
                                                    "WITHDRAW" &&
                                                  obj.product.symbol === "BNI"
                                                )
                                                  return (
                                                    <Box>Withdraw from BNI</Box>
                                                  );
                                                if (
                                                  obj.actionType ===
                                                    "DEPOSIT" &&
                                                  obj.product.symbol === "LCI"
                                                )
                                                  return (
                                                    <Box mt={1.5}>
                                                      Deposit to LCI
                                                    </Box>
                                                  );
                                                if (
                                                  obj.actionType ===
                                                    "WITHDRAW" &&
                                                  obj.product.symbol === "LCI"
                                                )
                                                  return (
                                                    <Box>Withdraw from LCI</Box>
                                                  );
                                              }
                                            })()}
                                            {/* {obj.actionType === 'DEPOSIT' ? <Box className={classes.data} mt={1.5}>{obj.actionType}</Box> : <Box className={classes.data}>{obj.actionType}</Box>} */}
                                            <Box className={classes.time}>
                                              {new Date(obj.createAt)
                                                .toLocaleTimeString(undefined, {
                                                  hour12: true,
                                                  hour: "2-digit",
                                                  minute: "2-digit",
                                                })
                                                .toUpperCase()}
                                            </Box>
                                            {/* {console.log(expArray.length, expArray, "exp arr")} */}
                                          </Box>
                                        </Box>
                                      </Grid>
                                      <Grid item xs={4} sm={4}>
                                        {obj.actionType === "DEPOSIT" ? (
                                          <Box mt={1.5} ml={1.5}>
                                            {obj.status === "S" ? (
                                              <Box
                                                className={classes.successful}
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                              >
                                                Completed
                                              </Box>
                                            ) : obj.status === "F" ? (
                                              <Box
                                                className={classes.failed}
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                              >
                                                Failed
                                              </Box>
                                            ) : obj.status === "P" ? (
                                              <Box
                                                className={classes.pending}
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                              >
                                                Pending
                                              </Box>
                                            ) : (
                                              <></>
                                            )}
                                          </Box>
                                        ) : (
                                          <Box ml={1.5}>
                                            {obj.status === "S" ? (
                                              <Box
                                                className={classes.successful}
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                              >
                                                Completed
                                              </Box>
                                            ) : obj.status === "F" ? (
                                              <Box
                                                className={classes.failed}
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                              >
                                                Failed
                                              </Box>
                                            ) : obj.status === "P" ? (
                                              <Box
                                                className={classes.pending}
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                              >
                                                Pending
                                              </Box>
                                            ) : (
                                              <></>
                                            )}
                                          </Box>
                                        )}
                                      </Grid>
                                      <Grid item xs={2} sm={2}>
                                        <Box
                                          display="flex"
                                          justifyContent="flex-start"
                                          className={classes.amount}
                                        >
                                          {obj.actionType === "DEPOSIT" ? (
                                            <Box mt={2}>
                                              {parseFloat(
                                                obj.amount
                                              ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                                style: "currency",
                                                currency: "USD",
                                              })}
                                            </Box>
                                          ) : (
                                            <Box mt={1}>
                                              -
                                              {parseFloat(
                                                obj.amount
                                              ).toLocaleString("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                                style: "currency",
                                                currency: "USD",
                                              })}
                                            </Box>
                                          )}
                                        </Box>
                                      </Grid>
                                      <Dropdown obj={obj} />
                                    </Grid>
                                  </Box>
                                </Box>
                              );
                            else {
                              return (
                                <Box key={j}>
                                  {boolVal && <Box>{t}</Box>}
                                  <Box
                                    className={classes.boxBorder}
                                    style={{ fontSize: "14px" }}
                                  >
                                    <Box
                                      display="flex"
                                      justifyContent="space-between"
                                    >
                                      <Box display="flex" alignItems="center">
                                        {(() => {
                                          if (
                                            obj.transactionCategory === "WALLET"
                                          ) {
                                            if (obj.actionType === "DEPOSIT")
                                              return (
                                                <Box mr={1}>
                                                  <img src={Deposit} />
                                                </Box>
                                              );
                                            if (obj.actionType === "WITHDRAW")
                                              return (
                                                <Box mr={1}>
                                                  <img src={Withdraw} />
                                                </Box>
                                              );
                                          } else {
                                            if (
                                              obj.actionType === "DEPOSIT" &&
                                              obj.product.symbol === "MWI"
                                            )
                                              return (
                                                <Box mr={1}>
                                                  <img src={MWIDeposit} />
                                                </Box>
                                              );
                                            if (
                                              obj.actionType === "WITHDRAW" &&
                                              obj.product.symbol === "MWI"
                                            )
                                              return (
                                                <Box mr={1}>
                                                  <img src={MWIWithdraw} />
                                                </Box>
                                              );
                                            if (
                                              obj.actionType === "DEPOSIT" &&
                                              obj.product.symbol === "BNI"
                                            )
                                              return (
                                                <Box mr={1}>
                                                  <img src={BNIDeposit} />
                                                </Box>
                                              );
                                            if (
                                              obj.actionType === "WITHDRAW" &&
                                              obj.product.symbol === "BNI"
                                            )
                                              return (
                                                <Box mr={1}>
                                                  <img src={BNIWithdraw} />
                                                </Box>
                                              );
                                            if (
                                              obj.actionType === "DEPOSIT" &&
                                              obj.product.symbol === "LCI"
                                            )
                                              return (
                                                <Box mr={1}>
                                                  <img src={LCIDeposit} />
                                                </Box>
                                              );
                                            if (
                                              obj.actionType === "WITHDRAW" &&
                                              obj.product.symbol === "LCI"
                                            )
                                              return (
                                                <Box mr={1}>
                                                  <img src={LCIWithdraw} />
                                                </Box>
                                              );
                                          }
                                        })()}
                                        <Box>
                                          {(() => {
                                            if (
                                              obj.transactionCategory ===
                                              "WALLET"
                                            ) {
                                              if (obj.actionType === "DEPOSIT")
                                                return (
                                                  <Box>
                                                    Wallet Balance Top up
                                                  </Box>
                                                );
                                              if (obj.actionType === "WITHDRAW")
                                                return (
                                                  <Box>
                                                    Withdraw from Wallet
                                                  </Box>
                                                );
                                            } else {
                                              if (
                                                obj.actionType === "DEPOSIT" &&
                                                obj.product.symbol === "MWI"
                                              )
                                                return (
                                                  <Box>Deposit to MWI</Box>
                                                );
                                              if (
                                                obj.actionType === "WITHDRAW" &&
                                                obj.product.symbol === "MWI"
                                              )
                                                return (
                                                  <Box>Withdraw from MWI</Box>
                                                );
                                              if (
                                                obj.actionType === "DEPOSIT" &&
                                                obj.product.symbol === "BNI"
                                              )
                                                return (
                                                  <Box>Deposit to BNI</Box>
                                                );
                                              if (
                                                obj.actionType === "WITHDRAW" &&
                                                obj.product.symbol === "BNI"
                                              )
                                                return (
                                                  <Box>Withdraw from BNI</Box>
                                                );
                                              if (
                                                obj.actionType === "DEPOSIT" &&
                                                obj.product.symbol === "LCI"
                                              )
                                                return (
                                                  <Box>Deposit to LCI</Box>
                                                );
                                              if (
                                                obj.actionType === "WITHDRAW" &&
                                                obj.product.symbol === "LCI"
                                              )
                                                return (
                                                  <Box>Withdraw from LCI</Box>
                                                );
                                            }
                                          })()}
                                        </Box>
                                      </Box>
                                      <Box
                                        display="flex"
                                        justifyContent="flex-end"
                                        mt={1}
                                        ml={1}
                                      >
                                        <Box
                                          className={classes.time}
                                          style={{ fontSize: "12px" }}
                                        >
                                          {new Date(obj.createAt)
                                            .toLocaleTimeString(undefined, {
                                              hour12: true,
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })
                                            .toUpperCase()}
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Box
                                      display="flex"
                                      justifyContent="space-between"
                                      mt={1}
                                    >
                                      <Box ml={1} mt={1}>
                                        {obj.actionType === "WITHDRAW"
                                          ? "-"
                                          : ""}
                                        {parseFloat(obj.amount).toLocaleString(
                                          "en-US",
                                          {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                            style: "currency",
                                            currency: "USD",
                                          }
                                        )}
                                      </Box>
                                      <Box>
                                        {obj.status === "S" ? (
                                          <Box
                                            className={classes.successful}
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                          >
                                            Completed
                                          </Box>
                                        ) : obj.status === "F" ? (
                                          <Box
                                            className={classes.failed}
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                          >
                                            Failed
                                          </Box>
                                        ) : obj.status === "P" ? (
                                          <Box
                                            className={classes.pending}
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                          >
                                            Pending
                                          </Box>
                                        ) : (
                                          <></>
                                        )}
                                      </Box>
                                    </Box>
                                    <Dropdown obj={obj} />
                                  </Box>
                                </Box>
                              );
                            }
                          })}
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default TransactionHistory;
