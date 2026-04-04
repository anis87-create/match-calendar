import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Legend from "./components/Legend";
import AddMatchForm from "./components/AddMatchForm";
import Filters from "./components/Filters";
import MatchList from "./components/MatchList";
import SetupWizard from "./components/SetupWizard";
import { deleteMatchesBeforeDate } from "./features/matches/matchesSlice";

export default function App() {
  const setupDone = useSelector((s) => s.profile.setupDone);
  const dispatch = useDispatch();

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
    const lastCleanup = localStorage.getItem("mc_last_cleanup_day");
    if (lastCleanup !== today) {
      dispatch(deleteMatchesBeforeDate(today));
      localStorage.setItem("mc_last_cleanup_day", today);
    }
  }, []);

  if (!setupDone) return <SetupWizard />;

  return (
    <div className="container">
      <Header />
      <Stats />
      <Legend />
      <AddMatchForm />
      <Filters />
      <MatchList />
    </div>
  );
}
