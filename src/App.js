import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Results from "./components/Results"
import "./App.css";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/results" element={<Results/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
