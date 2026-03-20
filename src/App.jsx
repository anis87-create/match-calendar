import Header from "./components/Header";
import Stats from "./components/Stats";
import Legend from "./components/Legend";
import AddMatchForm from "./components/AddMatchForm";
import Filters from "./components/Filters";
import MatchList from "./components/MatchList";

export default function App() {
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
