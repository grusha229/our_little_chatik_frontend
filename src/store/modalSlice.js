import {createSlice} from "@reduxjs/toolkit";


const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isVisible: false,
    },
    reducers: {
        toggleVisible(state) {
            return {
                isVisible: !state.isVisible
            }
        }
    }
})

export const {toggleVisible} = modalSlice.actions;

export default modalSlice.reducer
