import { ISearchResponse } from './../../models/search';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ISearchState {
  search_results: ISearchResponse;
}

const initialState: ISearchState  = {
  search_results: {
    chats: [],
    messages: [],
    users: [],
  }
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action: PayloadAction<ISearchResponse>) => {
      state.search_results = action.payload;
    },
    deleteSearchResults: (state) => {
      state.search_results = initialState.search_results;
    },
  },
});

export const { setSearchResults, deleteSearchResults } = searchSlice.actions;

export default searchSlice.reducer;
