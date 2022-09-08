import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
export interface IAppState {
    isResetPassword: boolean,
    userStatus: string | undefined,
    tempPassword: string | undefined,
    destinationPage: string,
    businessView: string,
    nonBusinessView: string
}

const initialState = {
    isResetPassword: false,
    userStatus: undefined,
    tempPassword: undefined,
    destinationPage: "/dashboard",
    businessView: "0",
    nonBusinessView: "0"
} as IAppState;

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        updateIsResetPassword(state, { payload }) {
            state.isResetPassword = payload.isReset
            state.tempPassword = payload.password
        },
        updateUserStatus(state, { payload }) {
            state.userStatus = payload.userStatus
        },
        updateDestinationPage(state, action) {
            state.destinationPage = action.payload
        },
        updateBusinessView(state, action) {
            state.businessView = action.payload
        },
        updateNonBusinessView(state, action) {
            state.nonBusinessView = action.payload
        }
    }
})

const baseInfo = (state: RootState) => state.app;

export default appSlice.reducer;

export const { updateIsResetPassword, updateUserStatus, updateDestinationPage, updateBusinessView, updateNonBusinessView } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
