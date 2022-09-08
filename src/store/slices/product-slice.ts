import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IAppState {
    productList: any[]
}

const initialState = {
    productList: []
} as IAppState;

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        updateProductList(state, { payload }) {
            state.productList = payload.products
        }
    }
})

const baseInfo = (state: RootState) => state.app;

export default productSlice.reducer;

export const { updateProductList } = productSlice.actions;

export const getProductState = createSelector(baseInfo, product => product);