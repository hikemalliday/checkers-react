import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NewGame from "./pages/NewGame";
import Replay from "./pages/Replay";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new_game" element={<NewGame />} />
          <Route path="/replay" element={<Replay />} />
          <Route path="/replay/:id" element={<Replay />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
