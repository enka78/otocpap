import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "light" | "dark" | "system";
  currentLocale: string;
}

const initialState: ThemeState = {
  theme:
    typeof window !== "undefined"
      ? (localStorage.getItem("theme") as ThemeState["theme"]) || "system"
      : "system",
  currentLocale:
    typeof window !== "undefined"
      ? localStorage.getItem("locale") || "tr"
      : "tr",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeState["theme"]>) => {
      state.theme = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("theme", action.payload);
      }
    },
    setLocale: (state, action: PayloadAction<string>) => {
      state.currentLocale = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("locale", action.payload);
      }
    },
  },
});

export const { setTheme, setLocale } = themeSlice.actions;
export default themeSlice.reducer;
