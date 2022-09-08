import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IAppState {
  recentTransactionData: any[];
}

const initialState = {
  recentTransactionData: [
    // {
    //   transactionId: "A",
    //   createdAt:
    //     "Wed Jun 15 2022 9:37:48 GMT+0000 (Coordinated Universal Time)",
    //   timestamp: "0",
    //   description: "Deposit into Low-risk Crypto Index",
    //   amount: "0.020000000000000000",
    //   actionType: "DEPOSIT",
    //   transactionCategory: "PRODUCT",
    //   userId: "1",
    //   userName: "Test",
    //   status: "S"
    // },
    // {
    //   transactionId: "A",
    //   createdAt:
    //     "Wed Jun 15 2022 19:37:48 GMT+0000 (Coordinated Universal Time)",
    //   timestamp: "0",
    //   description: "Deposit into Low-risk Crypto Index",
    //   amount: "0.020000000000000000",
    //   actionType: "DEPOSIT",
    //   transactionCategory: "PRODUCT",
    //   userId: "1",
    //   userName: "Test",
    //   status: "S"
    // },
    // {
    //   transactionId: "A",
    //   createdAt:
    //     "Wed Jun 15 2022 19:37:48 GMT+0000 (Coordinated Universal Time)",
    //   timestamp: "0",
    //   description: "Deposit into Low-risk Crypto Index",
    //   amount: "0.020000000000000000",
    //   actionType: "DEPOSIT",
    //   transactionCategory: "PRODUCT",
    //   userId: "1",
    //   userName: "Test",
    //   status: "F"
    // }
  ],
} as IAppState;

const recentTransactionSlice = createSlice({
  name: "recentTransaction",
  initialState,
  reducers: {
    updateRecentTransactionData(state, { payload }) {
      state.recentTransactionData = payload.data;
    },
    resetRecentTransactionData(state) {
      state.recentTransactionData = initialState.recentTransactionData;
    }
  },
});

const baseInfo = (state: RootState) => state.app;

export default recentTransactionSlice.reducer;

export const { updateRecentTransactionData, resetRecentTransactionData } = recentTransactionSlice.actions;

export const getRecentTransactionState = createSelector(
  baseInfo,
  (data) => data
);
