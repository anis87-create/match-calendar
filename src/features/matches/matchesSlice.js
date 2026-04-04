import { createSlice } from "@reduxjs/toolkit";

function loadFromStorage() {
  const keys = ["match_v4", "match_v3", "match_schedule_v2", "match_schedule"];
  for (const k of keys) {
    try {
      const s = localStorage.getItem(k);
      if (s) {
        const p = JSON.parse(s);
        if (p?.matches?.length > 0) {
          if (k !== "match_v4") localStorage.setItem("match_v4", s);
          return p;
        }
      }
    } catch (_) {}
  }
  return { matches: [], nextId: 1 };
}

const saved = loadFromStorage();

const matchesSlice = createSlice({
  name: "matches",
  initialState: {
    items: saved.matches,
    nextId: saved.nextId,
  },
  reducers: {
    addMatch(state, action) {
      state.items.push({ ...action.payload, id: state.nextId, watched: false });
      state.nextId += 1;
      persist(state);
    },
    updateMatch(state, action) {
      const idx = state.items.findIndex((m) => m.id === action.payload.id);
      if (idx !== -1) state.items[idx] = { ...state.items[idx], ...action.payload };
      persist(state);
    },
    deleteMatch(state, action) {
      state.items = state.items.filter((m) => m.id !== action.payload);
      persist(state);
    },
    toggleWatched(state, action) {
      const m = state.items.find((m) => m.id === action.payload);
      if (m) m.watched = !m.watched;
      persist(state);
    },
    deleteMatchesBeforeDate(state, action) {
      // action.payload = "YYYY-MM-DD" (aujourd'hui)
      state.items = state.items.filter((m) => m.date >= action.payload);
      persist(state);
    },
    reorderMatches(state, action) {
      const { activeId, overId } = action.payload;
      const si = state.items.findIndex((m) => m.id === activeId);
      const ti = state.items.findIndex((m) => m.id === overId);
      if (si === -1 || ti === -1) return;
      const [moved] = state.items.splice(si, 1);
      state.items.splice(ti, 0, moved);
      persist(state);
    },
  },
});

function persist(state) {
  try {
    localStorage.setItem("match_v4", JSON.stringify({ matches: state.items, nextId: state.nextId }));
  } catch (_) {}
}

export const { addMatch, updateMatch, deleteMatch, toggleWatched, reorderMatches, deleteMatchesBeforeDate } = matchesSlice.actions;
export default matchesSlice.reducer;
