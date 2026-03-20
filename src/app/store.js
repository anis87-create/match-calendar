import { configureStore } from "@reduxjs/toolkit";
import matchesReducer from "../features/matches/matchesSlice";
import uiReducer from "../features/ui/uiSlice";
import profileReducer from "../features/profile/profileSlice";

export const store = configureStore({
  reducer: {
    matches: matchesReducer,
    ui: uiReducer,
    profile: profileReducer,
  },
});
