import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../services/auth/authProvider";
import { getRecentTransaction } from "../../services/axios/recent-transaction";
import { updateRecentTransactionData } from "../../store/slices/recent-transaction-slice";
import { useAppSelector } from "../../store/hooks";
import { useLocation } from "react-router-dom";

function useRecentTransaction() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userData = useAppSelector((state) => state.user.userData);
  const location = useLocation();

  const findRecentTransaction = useCallback(async () => {
    const response = await getRecentTransaction(
      0, //page
      0, //limit
      "", //orderBy
      0, //orderSequence
      [], //emailAddresses
      [], //productId
      [], //productSymbol
      0, //start_time_gt
      0, //start_time_gte
      0, //end_time_lt
      0, //end_time_lte
      false, //minInfo
      true, //includeProductInfo
      false, //includeUserInfo
      [       //transactionCategories
        "WALLET",
        "PRODUCT"
      ],
      [       //actionTypes
        "DEPOSIT",
        "WITHDRAW"
      ],
      0, //transactionId
      [    //transactionIds
        "string"
      ]
    );
    const data = response?.data.data;

    //console.log("transaction api data", data)

    if (data.length > 0) {
      dispatch(updateRecentTransactionData({ data }));
    }
  }, []);

  useEffect(() => {
    if (user !== null && user !== undefined && (location.pathname === "/dashboard" || location.pathname === "/transaction-history")) {
      findRecentTransaction();
    }
  }, [user, location]);
}

export default useRecentTransaction;
