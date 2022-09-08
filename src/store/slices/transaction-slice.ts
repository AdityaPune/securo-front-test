import { createSlice } from "@reduxjs/toolkit";

type transactionState = {
    isTransacting?: boolean,
    txHash?: string,
    transactionCompleted?: boolean,
    isError?: boolean,
    errorMessages?: string,
    type?: string
}

const initialState = {
    transaction: {
        isTransacting: false,
        txHash: "",
        transactionCompleted: false,
        isError: false,
        errorMessages: "",
        type: ""
    } as transactionState
}

const transactionSlice = createSlice({
    name: "transaction",
    initialState,
    reducers: {
        transactionInitiated(state, { payload }) {
            const txHash = payload.txnHash;
            state.transaction = {
                ...state.transaction,
                txHash,
                isTransacting: true,
                type: payload.type,
            }
        },
        transactionSuccess(state) {
            state.transaction = {
                ...state.transaction,
                isTransacting: true,
                transactionCompleted: true,
            }
        },
        transactionError(state, { payload }) {
            state.transaction = {
                ...state.transaction,
                isTransacting: true,
                isError: true,
                type: payload.type
            }
        },
        transactionCompleted(state) {
            state.transaction = initialState.transaction
        }
    }
})

export const { transactionInitiated, transactionSuccess, transactionError, transactionCompleted } = transactionSlice.actions;

export default transactionSlice.reducer;