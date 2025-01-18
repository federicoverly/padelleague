import React from "react";
import "./App.css";

import { PageLayout } from "./components/PageLayout/PageLayout";
import { LandingPage } from "./components/LandingPage/LandingPage";

function App() {
  return (
    <div className="App">
      <PageLayout>
        <LandingPage />
      </PageLayout>
    </div>
  );
}

export default App;
