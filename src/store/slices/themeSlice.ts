import { createSlice } from "@reduxjs/toolkit";
import Theme from "@/enums/Theme";
import { themeApiService } from "@/store";

const initialState = {
  theme: Theme.LIGHT,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
      switchTheme(state) {
        return {...state, theme: state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT};
      },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                themeApiService.endpoints.switchTheme.matchFulfilled,
                (state, { payload }) => {
                    state.theme = payload.theme;
                }
            )
            .addMatcher(
                themeApiService.endpoints.getUserTheme.matchFulfilled,
                (state, { payload }) => {
                  state.theme = payload.theme;
                }
            )
    },
});

export const {
  switchTheme
} = themeSlice.actions;

export default themeSlice;
