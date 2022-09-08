import { configureStore } from "@reduxjs/toolkit";
//import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import appReducer from "./slices/app-slice";
import transactionReducer from "./slices/transaction-slice";
import messagesReducer from "./slices/messages-slice";
import productReducer from "./slices/product-slice";
import portfolioBreakdownSlice from "./slices/portfolio-breakdown-slice";
import userDataSlice from "./slices/user-slice";
import recentTransactionSlice from "./slices/recent-transaction-slice";
import strategyPerformanceReducer from "./slices/strategy-performance-slice";
import inactivityReducer from "./slices/inactivity-slice";

const store = configureStore({
  reducer: {
    app: appReducer,
    txn: transactionReducer,
    message: messagesReducer,
    product: productReducer,
    portfolioBreakdown: portfolioBreakdownSlice,
    user: userDataSlice,
    recentTransaction: recentTransactionSlice,
    strategyPerformance: strategyPerformanceReducer,
    inactivityStatus: inactivityReducer
  },
  // middleware: [createLogger(), thunk],
  middleware: [thunk],
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
