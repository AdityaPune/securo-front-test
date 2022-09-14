import {
  Button,
  Grid,
  TextField,
  Typography,
  AlertColor,
  Box,
} from "@mui/material";
import "./dashboard.scss";
import ProductList from "../../components/ProductList";
import PieChart from "../../components/PieChart";
import { useAppSelector } from "../../store/hooks";
import { useCallback, useContext, useEffect, useState } from "react";
import CompletedIcon from "../../assets/images/icons/completed.svg";
import PendingIcon from "../../assets/images/icons/pending.svg";
import { useAuth } from "../../services/auth/authProvider";
import { useNavigate } from "react-router-dom";

import * as _ from "lodash";
import DepositMini from "../../assets/images/common/deposit-mini.svg";

import DepositIcon from "../../assets/images/common/deposit.svg";
import WithdrawIcon from "../../assets/images/common/withdraw.svg";
import PositiveArrow from "../../assets/images/common/positivearrow.svg";
import Complete from "../../assets/images/common/complete.svg";
import Incomplete from "../../assets/images/common/incomplete.svg";

export interface IProductDistribution {
  label: string;
  color: string;
  percentage?: number;
  allocation: number;
}

function Dashboard() {
  const userData = useAppSelector((state) => state.user.userData);
  const recentTransactionData = useAppSelector(
    (state) => state.recentTransaction.recentTransactionData
  );

  //console.log(recentTransactionData, "recent transaction data");

  const portfolioBreakdownList = useAppSelector(
    (state) => state.portfolioBreakdown.portfolioBreakdownList
  );

  const [labels, setLabels] = useState<string[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [sum, setSum] = useState<number>(1);
  const [accountDropdown, setAccountDropdown] = useState<boolean>(false);
  const [userHasPortfolio, setUserHasPortfolio] = useState<boolean>(false);
  const [userHasTransactions, setUserHasTransactions] =
    useState<boolean>(false);

  // const colorArray = ["#2D69A4", "#A42D65", "0E6919"];
  const colorArray = ["#F0B90B", "#4D58FF", "#F4EBFF", "#58E4C8"];

  let navigate = useNavigate();

  useEffect(() => {
    let currLabels: string[] = [];
    let currSeries: any[] = [];

    if (portfolioBreakdownList.currentTotalHolding === "0") {
      return;
    } else {
      setUserHasPortfolio(true);
      portfolioBreakdownList["allocations"].forEach((d: any) => {
        if (Number(d.allocation) != 0) {
          currLabels.push(d.productName);
          currSeries.push(parseFloat(parseFloat(d.allocation).toFixed(2)));
        }
      });
    }

    setLabels(currLabels);
    setSeries(currSeries);
    setSum(_.sum(currSeries));
  }, [portfolioBreakdownList]);

  useEffect(() => {
    // if (!recentTransactionData) {
    //   return;
    // } else {
    //   setUserHasTransactions(true);
    //   // console.log(recentTransactionData);
    // }

    if (recentTransactionData && recentTransactionData.length > 0) {
      setUserHasTransactions(true);
    }
  }, [recentTransactionData]);

  const routeChange = (path: string) => {
    navigate(path);
  };

  const getTimestampDetails = (transaction: string) => {
    // const res = transaction.split(" ");
    // console.log(res);
    // return (
    //   res[2] +
    //   " " +
    //   res[1] +
    //   ", " +
    //   res[3] +
    //   " " +
    //   res[4].slice(0, 5) +
    //   " " +
    //   (res[4].slice(0, 3) > "12" ? "PM" : "AM")
    // );
    const dict: { [key: string]: string } = {
      "0": "Jan",
      "1": "Feb",
      "2": "March",
      "3": "Apr",
      "4": "May",
      "5": "Jun",
      "6": "Jul",
      "7": "Aug",
      "8": "Sep",
      "9": "Oct",
      "10": "Nov",
      "11": "Dec",
    };
    const day = new Date(transaction).getUTCDate().toString();
    const month = new Date(transaction).getMonth().toString();
    const hour = new Date(transaction).getUTCHours().toString();
    const minute = new Date(transaction).getUTCMinutes().toString();
    const year = new Date(transaction).getUTCFullYear().toString();
    // const day =

    // console.log(res);
    const hourInt: number = +hour;
    const res =
      day +
      " " +
      dict[month] +
      ", " +
      year +
      " " +
      hour +
      ":" +
      minute +
      " " +
      (hourInt > 12 ? "PM" : "AM");
    return res;
  };

  return (
    <Box
      className="dashboard-main-container"
      style={{ marginLeft: "38px", marginRight: "30px" }}
      mt={2}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} order={{ md: 1, xs: 2 }}>
          <div className="dashboard-leftside">
            <div className="chart-breakdown">
              <div className="chart-container">
                <div
                  className="header"
                  style={{ paddingLeft: "15px", paddingRight: "15px" }}
                >
                  <Grid container>
                    <Grid item sm={6} xs={12} justifyContent="center">
                      <Typography className="header-title">
                        Distribution of Portfolio
                      </Typography>
                    </Grid>
                    <Grid item sm={6} xs={12} justifyContent="center">
                      <div className="header-details">
                        <Typography className="amount-invested">
                          $
                          {Number(
                            portfolioBreakdownList.currentTotalHolding
                          ).toFixed(2)}{" "}
                        </Typography>{" "}
                        &nbsp;&nbsp;&nbsp;
                        <div className="header-subdetails">
                          <div className="growth-container">
                            <img src={PositiveArrow} />
                            &nbsp;
                            <Typography className="growth">
                              {parseFloat(
                                portfolioBreakdownList.totalHoldingChangePercentage
                              ).toFixed(2)}
                              &nbsp; %
                            </Typography>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  </Grid>
                </div>

                {userHasPortfolio && (
                  <Grid container className="visuals">
                    <Grid item xs={12} sm={6}>
                      <PieChart
                        labels={labels}
                        series={series}
                        colors={["#F0B90B", "#4D58FF", "#F4EBFF", "#58E4C8"]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} className="breakdown-list">
                      {labels.map((p: any, index: number) => {
                        return (
                          <Grid container className="list-row" spacing={2}>
                            <Grid
                              item
                              xs={8}
                              className="strategy-name-container"
                            >
                              <div
                                className="strategy-color"
                                style={{ backgroundColor: colorArray[index] }}
                              ></div>
                              <div className="strategy-name">{p}</div>
                            </Grid>
                            <Grid item xs={2} className="percentage-container">
                              {Math.abs(
                                (series[index] / Number(sum)) * 100
                              ).toFixed(1)}
                              %
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                )}
                {!userHasPortfolio && (
                  <Grid container className="notice">
                    <Grid item xs={12} className="notice-container">
                      <Typography className="notice-typography">
                        Start Investing to build a Portfolio!
                      </Typography>
                    </Grid>
                  </Grid>
                )}
              </div>
            </div>
            <div className="strategy-list">
              <ProductList />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={5} order={{ md: 1, xs: 1 }}>
          <Grid container className="dashboard-rightside">
            <Grid
              item
              xs={12}
              className="wallet-balance"
              order={{ md: 1, xs: 2 }}
            >
              <Typography className="header"> Wallet Balance</Typography>
              <Typography className="value">
                $&nbsp;{Number(userData?.walletBalance).toFixed(2)}
              </Typography>
            </Grid>
            {userData?.status !== "A" && (
              <Grid
                item
                xs={12}
                className="profile-details"
                order={{ md: 2, xs: 1 }}
              >
                <Typography className="header">
                  Complete your Profile
                </Typography>
                <div className="profile-row">
                  <Typography className="profile-row-typo">
                    1. Sign up
                  </Typography>
                  {userData?.status !== null ? (
                    <div className="icon-background-good">
                      <img src={Complete} />
                    </div>
                  ) : (
                    <div className="icon-background-bad">
                      <img src={Incomplete} />
                    </div>
                  )}
                </div>
                <div className="profile-row">
                  <Typography className="profile-row-typo">
                    2. Verify Email
                  </Typography>
                  {userData?.status === "U" ? (
                    <div className="icon-background-bad">
                      <img src={Incomplete} />
                    </div>
                  ) : (
                    <div className="icon-background-good">
                      <img src={Complete} />
                    </div>
                  )}
                </div>
                <div className="profile-row">
                  {userData?.userType === "B" ? (
                    <Typography className="profile-row-typo">
                      3. Complete KYB Process
                    </Typography>
                  ) : (
                    <Typography className="profile-row-typo">
                      3. Complete KYC Process
                    </Typography>
                  )}
                  {userData?.status == "A" ? (
                    <div className="icon-background-good">
                      <img src={Complete} />
                    </div>
                  ) : (
                    <div className="icon-background-bad">
                      <img src={Incomplete} />
                    </div>
                  )}
                </div>

                <div
                  className="profile-row-button"
                  onClick={() => routeChange("/verify")}
                >
                  {userData?.status === "A" ? (
                    <></>
                  ) : (
                    <div className="go-to-kyc">Complete Now</div>
                  )}
                </div>
              </Grid>
            )}
            <Grid item xs={12} className="transaction-history" order={3}>
              <Typography className="header">Transaction History</Typography>
              {!userHasTransactions && (
                <div className="transaction-container">
                  <div className="header">No Transaction</div>
                  <Typography className="statement">
                    You haven't made any transaction yet
                  </Typography>
                  <div className="deposit-button">
                    <img src={DepositMini} />
                    <Typography>Deposit</Typography>
                  </div>
                </div>
              )}

              {userHasTransactions &&
                recentTransactionData
                  .slice(-3)
                  .reverse()
                  .map((r, index: number) => {
                    return (
                      <div className="transaction-container-actual">
                        <div className="left-side flex-row align-items-center">
                          <img
                            src={
                              r.actionType === "DEPOSIT"
                                ? DepositIcon
                                : WithdrawIcon
                            }
                            alt="upanddown"
                            style={{
                              width: "40px",
                              height: "40px",
                              paddingBottom: "12px",
                            }}
                          />
                          <div style={{ marginLeft: "8px" }}>
                            <Typography className="action">
                              {`${r["actionType"].slice(0, 1).toUpperCase()}${r[
                                "actionType"
                              ]
                                .slice(1)
                                .toLowerCase()}`}
                            </Typography>
                            <Typography className="date">
                              {getTimestampDetails(r["createAt"])}
                            </Typography>
                          </div>
                        </div>
                        <div className="right-side">
                          <Typography className="amount">
                            $&nbsp;
                            {Number(r["amount"].substring(0, 8)).toFixed(2)}
                          </Typography>
                        </div>
                      </div>
                    );
                  })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
