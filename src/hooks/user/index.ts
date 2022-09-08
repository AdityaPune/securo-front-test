import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../services/auth/authProvider";
import { getProfile } from "../../services/axios/user";
import { updateUserData } from "../../store/slices/user-slice";

function useGetProfile() {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const findUserDetails = useCallback(async () => {
    const response = await getProfile();
    const data = response?.data.data;
    dispatch(updateUserData({ data }));
  }, []);

  useEffect(() => {
    if (user !== null && user !== undefined) {
      findUserDetails();
    }
  }, [user]);
}

export default useGetProfile;
