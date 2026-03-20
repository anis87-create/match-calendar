import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "../features/matches/matchesSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
    ui: uiReducer,
  },
});
