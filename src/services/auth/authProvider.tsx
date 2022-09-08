import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateDestinationPage, updateIsResetPassword, updateUserStatus } from "../../store/slices/app-slice";
import { error } from "../../store/slices/messages-slice";
import { resetPortfolioBreakdownList } from "../../store/slices/portfolio-breakdown-slice";
import { resetRecentTransactionData } from "../../store/slices/recent-transaction-slice";
import { resetUserData } from "../../store/slices/user-slice";
import { login as userLogin } from "../axios/auth";
import { resetPortfolioAllocationAndStrategyPerformanceList } from "../../store/slices/strategy-performance-slice";

interface AuthContextType {
    user: any;
    login: (emailAddress: string, password: string) => void;
    logout: () => void
}

let AuthContext = React.createContext<AuthContextType>({
    user: null,
    login: (emailAddress: string, password: string) => { },
    logout: () => { }
});

export function useAuth() {
    return React.useContext(AuthContext)
}

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<any>(null);
    const [accessToken, setAccessToken] = useState("");
    const [expiresIn, setExpiresIn] = useState(null);

    const dispatch = useDispatch()

    useEffect(() => {
        const token = localStorage.getItem("access_token")
        const loginUser: any = localStorage.getItem("user")

        if (token !== null && token !== undefined) {
            setAccessToken(token)
        }

        if (loginUser !== undefined && loginUser !== null) {
            const userStatus = JSON.parse(loginUser)?.status;
            dispatch(updateUserStatus({ userStatus }));
            setUser(JSON.parse(loginUser))
        }
    }, [])

    const login = async (emailAddress: string, password: string) => {
        const response = await userLogin(emailAddress, password);
        if (response?.data?.errorMessage !== undefined) {
            const errorMessage = response?.data?.errorMessage;
            dispatch(error(({
                text: errorMessage,
                error: "Something wrong"
            })));
            return;
        }

        if (response?.data?.data !== undefined && response?.data?.data !== null) {
            const accessToken = response.data.data.access_token;
            const loginUser = response.data.data.user;
            const isReset = loginUser.isReset; // user choose to reset password before

            if (isReset) {
                dispatch(updateIsResetPassword({ isReset: true, password: password }))
            }

            dispatch(updateUserStatus({ userStatus: loginUser.status }));

            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("user", JSON.stringify(loginUser));

            setUser(loginUser);
            setAccessToken(accessToken);
            setExpiresIn(expiresIn);
        }
    }

    const logout = async () => {
        setUser(null);
        setAccessToken("");
        setExpiresIn(null);

        // Reset dashboard data
        dispatch(resetUserData());
        dispatch(resetRecentTransactionData());
        dispatch(resetPortfolioBreakdownList());
        dispatch(resetPortfolioAllocationAndStrategyPerformanceList());
        dispatch(updateDestinationPage("/dashboard"));

        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    }

    const contextValue = {
        user,
        login,
        logout,
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export default AuthProvider