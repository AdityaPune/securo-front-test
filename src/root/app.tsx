import {
  Route,
  Routes,
  BrowserRouter,
  useLocation,
  Navigate,
  Outlet,
  Location
} from "react-router-dom";

import Invest from "../pages/Invest";
import DocSubmission from "../pages/Kyc";
import ViewBase from "../components/ViewBase";

import "../components/app.scss";
import Main from "../pages/Main";
import ResetPassword from "../components/ResetPassword";

import Recovery from "../components/ResetPassword/recovery";
import ChangePassword from "../components/ResetPassword/changePassword";
import ThemedSnackBar, { SnackBarProps } from "../components/Snackbar";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { AlertColor, useMediaQuery } from "@mui/material";
import { useAuth } from "../services/auth/authProvider";
import CreateAccount from "../components/CreateAccount";
import useProducts from "../hooks/products";
import usePortfolio from "../hooks/portfolio";
import useGetProfile from "../hooks/user";
import useRecentTransaction from "../hooks/transactions";
import Product from "../pages/Product";
import Dashboard from "../pages/Dashboard";
import Portfolio from "../pages/Portfolio";
import AccountComponent from "../pages/My Profile";
import useStrategyPerformance from "../hooks/strategyPerformance";
import usePortfolioAllocation from "../hooks/portfolioAllocation";
import TransactionHistory from "../pages/TransactionHistory";
import { useInactivityChecker } from "../hooks/inactiveUser";
import { useRefreshTokens, useOnPageRefresh } from "../hooks/refreshToken";
import AlertBox from "../components/AlertBox";
import { updateDestinationPage } from "../store/slices/app-slice";

function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  const user = !auth.user ? localStorage.getItem("user") : auth.user;

  if (!user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

function App() {
  useProducts();
  usePortfolio();
  useGetProfile();
  useRecentTransaction();
  useStrategyPerformance();
  usePortfolioAllocation();
  useInactivityChecker();
  useRefreshTokens();
  useOnPageRefresh();

  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      if (location.pathname === "/dashboard" ||
        location.pathname === "/invest" ||
        location.pathname === "/invest/LCI" ||
        location.pathname === "/invest/MWI" ||
        location.pathname === "/invest/BNI" ||
        location.pathname === "/portfolio-performance" ||
        location.pathname === "/transaction-history" ||
        location.pathname === "/verify" ||
        location.pathname === "/my-account"
      ) {
        // console.log("location", location.pathname);
        dispatch(updateDestinationPage(location.pathname));
      }
    }
  }, [])

  const status = useAppSelector(state => state.inactivityStatus.inactiveStatus)
  const matches = useMediaQuery('(max-width:960px)')

  const msg = useAppSelector((state) => state.message);
  const [messageText, setMessageText] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const [snackbar, setSnackBar] = useState(false);

  useEffect(() => {
    if (msg.message !== undefined && msg.message !== null) {
      const message: any = msg.message;
      setSeverity(message.severity);
      setMessageText(message.text);
      setSnackBar(true);
    }
  }, [msg]);
  let snackbarProps: SnackBarProps = {
    message: messageText,
    open: snackbar,
    handleOpen: setSnackBar,
    type: severity,
  };

  return (
    <ViewBase>
      <div className="flex-row flex-content-center" style={!matches ? { marginTop: "80px" } : {}}>
        {status && <AlertBox />}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/forget-password" element={<Recovery />} />
          <Route path="/register" element={<CreateAccount />} />
          <Route path="*" element={<Main />} />
          <Route element={<RequireAuth />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invest">
              <Route index={true} element={<Invest />} />
              <Route index={false} path=":symbol" element={<Product />} />
            </Route>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/portfolio-performance" element={< Portfolio />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/my-account" element={< AccountComponent />} />
            <Route path="/verify" element={<DocSubmission />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
        </Routes>
      </div>
      <ThemedSnackBar {...snackbarProps} />
    </ViewBase>
  );
}

export default App;
