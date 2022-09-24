import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  isSSR: boolean;
} = {
  isSSR: false,
};

const ssrModeSlice = createSlice({
  name: "ssrMode",
  initialState,
  reducers: {
    setSSRMode(state) {
      state.isSSR = true;
    },
    setClientMode(state) {
      state.isSSR = false;
    },
  },
});
export const { setSSRMode, setClientMode } = ssrModeSlice.actions;
export default ssrModeSlice;
