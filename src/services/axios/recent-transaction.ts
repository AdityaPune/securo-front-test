import { IUser } from "../../interfaces/user";
import axios, { getJWT } from "./axios";

//18 items
export const getRecentTransaction = async (
  page: number,
  limit: number,
  orderBy: string,
  orderSequence: number,
  emailAddresses: any[],
  productId: any[],
  productSymbol: any[],
  start_time_gt: number,
  start_time_gte: number,
  end_time_lt: number,
  end_time_lte: number,
  minInfo: boolean,
  includeProductInfo: boolean,
  includeUserInfo: boolean,
  transactionCategories: string[],
  actionTypes: string[],
  transactionId: number,
  transactionIds: string[],
) => {
  const headers = await getJWT();

  try {
    const response = await axios
      .post(
        "/api/v1/transaction/get-transactions",
        {
          page: page,
          limit: limit,
          orderBy: orderBy,
          orderSequence: orderSequence,
          emailAddresses: emailAddresses,
          productId: productId,
          productSymbol: productSymbol,
          start_time_gt: start_time_gt,
          start_time_gte: start_time_gte,
          end_time_lt: end_time_lt,
          end_time_lte: end_time_lte,
          minInfo: minInfo,
          includeProductInfo: includeProductInfo,
          includeUserInfo: includeUserInfo,
          transactionCategories: transactionCategories,
          actionTypes: actionTypes,
          transactionId: transactionId,
          transactionIds: transactionIds
        },
        headers
      )
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  } catch (error) {
    console.log(`Error thrown: `, error);
  }
};
