import { Grid, Button, useMediaQuery, Box, Card } from "@mui/material";
import WhiteWrapper from "../WhiteWrapper";
import { useSelector, useDispatch } from "react-redux";
import products from "./products-mock";
import "./style.scss";
import { useAppSelector } from "../../store/hooks";
import { productIcon, acceptedToken } from "./product-mapping";
import { useEffect, useState } from "react";
import BNI from "../../assets/images/product_distribution/bni.svg";
import MWI from "../../assets/images/product_distribution/mwi.svg";
import LCI from "../../assets/images/product_distribution/lci.svg";
import PositiveArrow from "../../assets/images/common/positivearrow.svg";
import NegativeArrow from "../../assets/images/common/negativearrow.svg";

import { useNavigate } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";

export interface IProduct {
  productIcon: string;
  productName: string;
  assetIcon: string;
  liquidity: number;
  roi: number;
}
export interface IProductIcon {
  [key: string]: string;
}
export interface IAssetIcons {
  [key: string]: string[];
}

function ProductListHeader() {
  return (
    <Grid container className="table-header-container">
      <Grid item xs={5} className="table-header-item">
        <div className="text-special">Name of Strategy</div>
      </Grid>

      <Grid item xs={2} className="table-header-item">
        <div className="text">Assets</div>
      </Grid>

      {/* <Grid item xs={2} className="table-header-item">
        <span className="text">Liquidity</span>
      </Grid> */}

      <Grid item xs={2} className="table-header-item">
        <div className="text">ROI</div>
      </Grid>
      <Grid item xs={3} className="table-header-item">
        <div className="text"></div>
      </Grid>
    </Grid>
  );
}

function ProductList() {
  const productList = useAppSelector((state) => state.product.productList);
  const [mwiAssets, setMwiAssets] = useState<string[]>([]);
  const [bniiAssets, setBniAssets] = useState<string[]>([]);
  const [lrcAssets, setLrcAssets] = useState<string[]>([]);

  const matches = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();

  useEffect(() => {
    setMwiAssets(acceptedToken["Market Weighted Index"]);
    setBniAssets(acceptedToken["Blockchain Network Index"]);
    setLrcAssets(acceptedToken["Low-risk Crypto Index"]);
  }, []);

  return (
    <TableContainer component={Paper} className="table-container">
      <Table sx={{ minWidth: 650 }} aria-label="simple table" className="table">
        <TableHead className="table-head">
          <TableRow className="head-row">
            <TableCell className="head-cell">Name of Strategy</TableCell>
            <TableCell className="head-cell">Assets</TableCell>
            <TableCell className="head-cell">ROI</TableCell>
            <TableCell className="head-cell"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="table-body">
          {productList.map((p, index: number) => (
            <TableRow
              key={p.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              className="body-row"
            >
              <TableCell component="th" scope="row" className="table-cell">
                <div className="strat-name">
                  <img
                    src={productIcon[p.name]}
                    alt={index.toString()}
                    className="product-icon"
                  />
                  <span style={{ marginLeft: "4px" }} className="text">
                    {p.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="table-cell">
                {p.name === "Market Weighted Index" ? (
                  <div className="icon-container">
                    <img src={MWI} className="icon" />
                  </div>
                ) : p.name === "Low-risk Crypto Index" ? (
                  <div className="icon-container">
                    <img src={LCI} className="icon" />
                  </div>
                ) : (
                  <div className="icon-container">
                    <img src={BNI} className="icon" />
                  </div>
                )}
              </TableCell>
              <TableCell className="table-cell">
                {p.roi ? (
                  p.roi >= 0 ? (
                    <div className="positive-roi">
                      <img src={PositiveArrow} />
                      <span className="text">
                        {parseFloat(p.roi).toFixed(2)} %
                      </span>
                    </div>
                  ) : (
                    <div className="negative-roi">
                      <img src={NegativeArrow} />
                      <span className="text">
                        {parseFloat(p.roi).toFixed(2)} %
                      </span>
                    </div>
                  )
                ) : (
                  <div className="positive-roi">0.00 %</div>
                )}
              </TableCell>
              <TableCell className="table-cell">
                <Button
                  className="product-button"
                  onClick={() => navigate(`/invest/${p.symbol.toLowerCase()}`)}
                  variant="contained"
                >
                  Invest
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ProductList;
