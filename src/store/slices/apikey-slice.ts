import { createSelector, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IAppState {
  apiKeys: any[];
  headers: any[];
}

const initialState = {
  apiKeys: [],
  headers: [
    {
      title: 'API Keys',
      key: 'key',
      width: 4,
    },
    {
      title: 'Created Date',
      key: 'createdDate',
      width: 4,
      rowStyle: {
        color: '#7c7c7c',
      },
    },
    {
      title: '',
      key: 'actions',
      width: 4,
    },
  ],
} as IAppState;

const apiKeySlice = createSlice({
  name: 'apiKey',
  initialState,
  reducers: {
    set(state, { payload }) {
      state.apiKeys = payload.data;
    },
    reset(state) {
      state.apiKeys = initialState.apiKeys;
    },
  },
});

const baseInfo = (state: RootState) => state.app;

export default apiKeySlice.reducer;

export const { set, reset } = apiKeySlice.actions;

export const getApiKeyState = createSelector(baseInfo, (data) => data);
