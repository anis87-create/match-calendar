import { useSelector } from "react-redux";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Legend from "./components/Legend";
import AddMatchForm from "./components/AddMatchForm";
import Filters from "./components/Filters";
import MatchList from "./components/MatchList";
import SetupWizard from "./components/SetupWizard";

export default function App() {
  const setupDone = useSelector((s) => s.profile.setupDone);

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
