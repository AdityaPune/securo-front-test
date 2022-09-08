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
import { useNavigate } from "react-router-dom";

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

  if (!matches) {
    return (
      <div className="product-container">
        <ProductListHeader />
        <div className="product-container-rows">
          {productList.map((p, index: number) => {
            return (
              <div className="product-row">
                <Grid container className="product-row-container">
                  <Grid item xs={5} className="product-row-container-element">
                    <img
                      src={productIcon[p.name]}
                      alt={index.toString()}
                      className="product-icon"
                    />
                    <span style={{ marginLeft: "4px" }} className="text">
                      {p.name}
                    </span>
                  </Grid>

                  <Grid item xs={2} className="product-row-container-element">
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
                  </Grid>

                  <Grid item xs={2} className="product-row-container-element">
                    {p.roi ? (
                      p.roi >= 0 ? (
                        <span className="positive-roi">
                          {parseFloat(p.roi).toFixed(2)} %
                        </span>
                      ) : (
                        <span className="negative-roi">
                          {parseFloat(p.roi).toFixed(2)} %
                        </span>
                      )
                    ) : (
                      <span className="positive-roi">0.00 %</span>
                    )}
                  </Grid>

                  <Grid
                    item
                    xs={3}
                    className="product-row-container-element-button"
                  >
                    <Button
                      className="product-button"
                      onClick={() =>
                        navigate(`/invest/${p.symbol.toLowerCase()}`)
                      }
                      variant="contained"
                    >
                      Invest
                    </Button>
                  </Grid>
                </Grid>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <Box mt={2} style={{ fontFamily: "OpenSans" }}>
        {productList.map((p, i) => {
          return (
            <Card
              style={{
                marginTop: "15px",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <Box display="flex">
                <Box mr={2}>
                  <img
                    src={productIcon[p.name]}
                    alt={i.toString()}
                    style={{ width: "30px" }}
                  />
                </Box>
                <Box>
                  <Box style={{ fontSize: "12px", color: "#7C7C7C" }}>
                    Name of Strategy
                  </Box>
                  <Box style={{ fontSize: "14px", fontWeight: 600 }}>
                    {p.name}
                  </Box>
                </Box>
              </Box>
              <Box display="flex" justifyContent="space-between" my={2}>
                <Box>
                  <Box style={{ fontSize: "12px", color: "#7C7C7C" }} mb={1}>
                    Assets
                  </Box>
                  <Box>
                    {p.name === "Market Weighted Index" ? (
                      <div>
                        <img
                          src={MWI}
                          className="icon"
                          style={{ height: "20px" }}
                        />
                      </div>
                    ) : p.name === "Low-risk Crypto Index" ? (
                      <div>
                        <img
                          src={LCI}
                          className="icon"
                          style={{ height: "20px" }}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          src={BNI}
                          className="icon"
                          style={{ height: "20px" }}
                        />
                      </div>
                    )}
                  </Box>
                </Box>
                <Box>
                  <Box style={{ fontSize: "12px", color: "#7C7C7C" }} mb={1}>
                    ROI
                  </Box>
                  <Box>
                    {p.roi ? (
                      p.roi >= 0 ? (
                        <span
                          style={{
                            color: "#15c73e",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          {parseFloat(p.roi).toFixed(2)} %
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "red",
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          {parseFloat(p.roi).toFixed(2)} %
                        </span>
                      )
                    ) : (
                      <span
                        style={{
                          color: "#15c73e",
                          fontSize: "14px",
                          fontWeight: 600,
                        }}
                      >
                        0.00 %
                      </span>
                    )}
                  </Box>
                </Box>
              </Box>
              <Button
                style={{ background: "#76d1bf", height: "36px" }}
                fullWidth
                onClick={() => navigate(`/invest/${p.symbol.toLowerCase()}`)}
              >
                Invest
              </Button>
            </Card>
          );
        })}
      </Box>
    );
  }
}

export default ProductList;
