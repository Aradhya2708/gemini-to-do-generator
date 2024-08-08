import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth.jsx";
import Home from "./components/Home.jsx";
import MainTask from "./pages/MainTask.jsx";  
import SpecificTask from "./pages/SpecificTask.jsx";
import Settings from './pages/Settings.jsx'; 
import Layout from './components/Layout.jsx'; // Import Layout

function App() {
  console.log('Rendering App component');

  return (
    <Router>
      <Routes>
        <Route path="/" element= {<Auth />}/>
          <Route element={<Layout />}>
          <Route path="/home" element= {<Home />}/>
          <Route path="/main-tasks" element= {<MainTask />}/>
          <Route path="/specific-tasks" element= {<SpecificTask />}/>
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;