import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth/authProvider";
import { getportfolioAllocation } from "../../services/axios/portfolioAllocation";
import { updatePortfolioAllocation } from "../../store/slices/strategy-performance-slice";

function usePortfolioAllocation() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const location = useLocation();

    const findPortfolioAllocation = useCallback(async () => {
        const response = await getportfolioAllocation();
        const portfolios = response.data.data;

        dispatch(updatePortfolioAllocation(portfolios))
    }, [])

    useEffect(() => {
        if (user && (location.pathname === "/portfolio-performance")) {
            findPortfolioAllocation();
        }
    }, [user, location])

    // useEffect(() => {
    //     findPortfolioAllocation();
    // }, [])
}

export default usePortfolioAllocation;