import Product1 from "../assets/images/mock/product-1.svg";
import Product2 from "../assets/images/mock/product-2.svg";
import Assets from "../assets/images/mock/assets.svg";
import { IProduct } from ".";
import { useSelector, useDispatch } from "react-redux";

const products: IProduct[] = [
  {
    productIcon: Product1,
    productName: "Market Weighted Index",
    assetIcon: Assets,
    liquidity: 123434343,
    roi: 47,
  },
  {
    productIcon: Product2,
    productName: "Low Risk Crypto",
    assetIcon: Assets,
    liquidity: 123434343,
    roi: 47,
  },
  {
    productIcon: Product1,
    productName: "Market Weighted Index",
    assetIcon: Assets,
    liquidity: 123434343,
    roi: 47,
  },
  {
    productIcon: Product2,
    productName: "Low Risk Crypto",
    assetIcon: Assets,
    liquidity: 123434343,
    roi: 47,
  },
];

export default products;
