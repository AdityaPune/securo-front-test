import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth/authProvider";
import { getStrategies } from "../../services/axios/strategyPerformance";
import { updateStrategyPerformanceList } from "../../store/slices/strategy-performance-slice";

function useStrategyPerformance() {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const location = useLocation();

    const findStrategies = useCallback(async () => {
        const response = await getStrategies();
        const strategies = response.data.data;
        // console.log(strategies);

        dispatch(updateStrategyPerformanceList(strategies))
    }, [])

    // useEffect(() => {
    //     if (user)
    //         setInterval(() => {
    //             findStrategies();
    //         }, 5000)

    // }, [user])

    useEffect(() => {
        if (user && location.pathname === "/portfolio-performance") {
            findStrategies();
        }
    }, [user, location])

    // useEffect(() => {
    //     findStrategies();
    // }, [])
}

export default useStrategyPerformance;