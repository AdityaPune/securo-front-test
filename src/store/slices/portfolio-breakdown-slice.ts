import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IAppState {
  portfolioBreakdownList: any;
}

const initialState = {
  portfolioBreakdownList: {
    currentTotalHolding: "0",
    oneWeekAgoTotalHolding: "0",
    totalHoldingChangePercentage: "0",
    allocations: [
      {
        productId: 1,
        productName: "Low-risk Crypto Index",
        sharesInUsd: "0",
        shares: "0",
        allocation: "0",
      },
      {
        productId: 2,
        productName: "Market Weighted Index",
        sharesInUsd: "0",
        shares: "0",
        allocation: "0",
      },
    ],
  },
} as IAppState;

const portfolioBreakdownSlice = createSlice({
  name: "portfolioBreakdown",
  initialState,
  reducers: {
    updatePortfolioBreakdownList(state, { payload }) {
      state.portfolioBreakdownList = payload.portfolio;
    },
    resetPortfolioBreakdownList(state) {
      state.portfolioBreakdownList = initialState.portfolioBreakdownList;
    }
  },
});

const baseInfo = (state: RootState) => state.app;

export default portfolioBreakdownSlice.reducer;

export const { updatePortfolioBreakdownList, resetPortfolioBreakdownList } = portfolioBreakdownSlice.actions;

export const getPortfolioBreakdownState = createSelector(
  baseInfo,
  (portfolio) => portfolio
);
