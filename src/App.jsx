import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Legend from "./components/Legend";
import AddMatchForm from "./components/AddMatchForm";
import Filters from "./components/Filters";
import MatchList from "./components/MatchList";
import SetupWizard from "./components/SetupWizard";
import { deleteMatchesBeforeMonth } from "./features/matches/matchesSlice";

export default function App() {
  const setupDone = useSelector((s) => s.profile.setupDone);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"
    const lastCleanup = localStorage.getItem("mc_last_cleanup_month");
    if (lastCleanup !== currentMonth) {
      dispatch(deleteMatchesBeforeMonth(currentMonth));
      localStorage.setItem("mc_last_cleanup_month", currentMonth);
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
