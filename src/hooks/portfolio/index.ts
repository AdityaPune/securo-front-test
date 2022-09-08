import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../services/auth/authProvider";
import { getUserPortfolio } from "../../services/axios/portfolio";
import { updatePortfolioBreakdownList } from "../../store/slices/portfolio-breakdown-slice";
import { useAppSelector } from "../../store/hooks";
import { useLocation } from "react-router-dom";

function usePortfolio() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();

  const portfolioBreakdownList = useAppSelector(
    (state) => state.portfolioBreakdown.portfolioBreakdownList
  );
  const getCompletePortfolio = useCallback(async () => {
    const response = await getUserPortfolio();
    const portfolio = response?.data.data;

    if (portfolio && Number(portfolio.currentTotalHolding) > 0) {
      dispatch(updatePortfolioBreakdownList({ portfolio }));
    }
  }, []);

  useEffect(() => {
    if (
      user !== null &&
      user !== undefined &&
      location.pathname === "/dashboard"
    ) {
      getCompletePortfolio();
    }
  }, [user, location]);
}

export default usePortfolio;
