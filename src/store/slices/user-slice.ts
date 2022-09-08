import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IAppState {
  userData: any;
}

const initialState = {
  userData: {
    id: 1,
    userId: 0,
    firstName: "Test",
    emailAddress: "test@daoventures.co",
    backupEmailAddress: null,
    phoneNumber: "123456",
    nric: "123456",
    farId: null,
    alternativeFarId: null,
    referralCode: "PSWzXMWt5",
    status: "A",
    userPhotoUrl: null,
    isMobileVerified: false,
    emailVerifyTime: null,
    otpGenerateTime: null,
    createdDate: "2022-06-15T17:04:58.874Z",
    updatedDate: "2022-06-22T18:03:37.000Z",
    updatedBy: "self",
    referralUserId: null,
    lastName: "DaoVentures",
    dateofBirth: "2021-08-18T00:00:00.000Z",
    street: "Uptown 223",
    city: "Singapore",
    state: "Singapore",
    country: "Singapore",
    postalCode: 88999,
    userPassportFrontUrl:
      "_production/upload-user-passport-front/1655787406732_passport-front.png",
    userPassportBackUrl: null,
    userNricUrl: "_production/upload-user-nric/1655787407582_national_id.png",
    KYCVerifyTime: null,
    KYCVerifyStatus: null,
    walletBalance: "0",
  },
} as IAppState;

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    updateUserData(state, { payload }) {
      state.userData = payload.data;
    },
    resetUserData(state) {
      state.userData = initialState.userData
    }
  },
});

const baseInfo = (state: RootState) => state.app;

export default userDataSlice.reducer;

export const { updateUserData, resetUserData } = userDataSlice.actions;

export const getUserDataState = createSelector(baseInfo, (data) => data);
