import MWIIcon from "../../assets/images/products/mwi.svg";
import LRCIcon from "../../assets/images/products/lci.svg";
import BNIIcon from "../../assets/images/products/bni.svg";
import USDCIcon from "../../assets/images/icons/usdc.png";
import USDTIcon from "../../assets/images/icons/usdt.png";
import DAIIcon from "../../assets/images/icons/dai.png";
import ETHIcon from "../../assets/images/icons/eth.png";

import { IProductIcon, IAssetIcons } from ".";

export const productIcon: IProductIcon = {
  "Market Weighted Index": MWIIcon,
  "Low-risk Crypto Index": LRCIcon,
  "Blockchain Network Index": BNIIcon,
};

export const acceptedToken: IAssetIcons = {
  "Market Weighted Index": [ETHIcon, USDCIcon, USDTIcon, DAIIcon],
  "Low-risk Crypto Index": [ETHIcon, USDTIcon, USDCIcon],
  "Blockchain Network Index": [ETHIcon, USDCIcon, DAIIcon],
};
