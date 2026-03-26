import { useState } from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Stats from "./components/Stats";
import Legend from "./components/Legend";
import AddMatchForm from "./components/AddMatchForm";
import Filters from "./components/Filters";
import MatchList from "./components/MatchList";
import SetupWizard from "./components/SetupWizard";
import SuggestionsModal from "./components/SuggestionsModal";

export default function App() {
  const setupDone = useSelector((s) => s.profile.setupDone);
  const [showSuggestions, setShowSuggestions] = useState(false);

  if (!setupDone) return <SetupWizard />;

  return (
    <div className="container">
      <Header />
      <Stats />
      <Legend />
      <AddMatchForm />
      <Filters />
      <div className="suggestions-trigger-row">
        <button
          className="suggestions-btn"
          onClick={() => setShowSuggestions(true)}
        >
          ✨ Suggestions J+2
        </button>
      </div>
      <MatchList />
      <SuggestionsModal
        isOpen={showSuggestions}
        onClose={() => setShowSuggestions(false)}
      />
    </div>
  );
}
