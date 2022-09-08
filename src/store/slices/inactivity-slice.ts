import { createSlice } from '@reduxjs/toolkit';

export interface InactivityStatus {
    inactiveStatus: boolean
}

const initialState: InactivityStatus = {
    inactiveStatus: false
}

const inactivitySlice = createSlice({
    name: 'inactivity',
    initialState,
    reducers: {
        updateInactivityStatus(state, action) {
            state.inactiveStatus = action.payload
        }
    }
})

export const { updateInactivityStatus } = inactivitySlice.actions

export default inactivitySlice.reducer