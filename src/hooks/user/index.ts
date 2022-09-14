import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../services/auth/authProvider";
import { getProfile } from "../../services/axios/user";
import { updateUserData } from "../../store/slices/user-slice";

function useGetProfile() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const location = useLocation();

  const findUserDetails = useCallback(async () => {
    const response = await getProfile();
    const data = response?.data.data;
    dispatch(updateUserData({ data }));
  }, []);

  useEffect(() => {
    if (user !== null && user !== undefined
      && (location.pathname === "/dashboard"
        || location.pathname === "/transaction-history"
        || location.pathname === "/verify"
        || location.pathname === "/my-account")) {
      findUserDetails();
    }
  }, [user, location]);
}

export default useGetProfile;
