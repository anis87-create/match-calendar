import { createSlice } from "@reduxjs/toolkit";

function loadProfile() {
  try {
    const s = localStorage.getItem("match_profile");
    if (s) return JSON.parse(s);
  } catch (_) {}
  return { name: "", favoriteTeams: [], favoriteLeagues: [], setupDone: false };
}

const profileSlice = createSlice({
  name: "profile",
  initialState: loadProfile(),
  reducers: {
    saveProfile(state, action) {
      const { name, favoriteTeams, favoriteLeagues } = action.payload;
      state.name = name;
      state.favoriteTeams = favoriteTeams;
      state.favoriteLeagues = favoriteLeagues;
      state.setupDone = true;
      persist(state);
    },
    resetProfile(state) {
      state.setupDone = false;
      persist(state);
    },
  },
});

function persist(state) {
  try {
    localStorage.setItem("match_profile", JSON.stringify(state));
  } catch (_) {}
}

export const { saveProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
