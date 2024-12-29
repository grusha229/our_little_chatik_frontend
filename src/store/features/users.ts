import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICurrentUserInfoResponse } from "../../models/users";

export interface IUsersState {
    current_user: ICurrentUserInfoResponse | null
}

const initialState: IUsersState  = {
    current_user: null,
}

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<ICurrentUserInfoResponse>) => {
      state.current_user = action.payload;
    },
    deleteCurrentUser: (state) => {
      state.current_user = null;
    },
  },
});

export const { deleteCurrentUser, setCurrentUser } = usersSlice.actions;

export default usersSlice.reducer;
