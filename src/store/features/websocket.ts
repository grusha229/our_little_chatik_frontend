// slices/websocketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
  connected: boolean;
  connection: any;
}

const initialState: WebSocketState = {
  connected: false,
  connection: null,
};

export const websocketSlice = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
    setConnection: (state, action: PayloadAction<boolean>) => {
      state.connection = action.payload;
    },
  },
});

export const { setConnectionStatus, setConnection } = websocketSlice.actions;
export default websocketSlice.reducer;