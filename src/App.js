import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Contact from "./components/Contact";
import Search from "./components/Search";
import ShoesDetails from "./components/ShoeDetails";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shoes/:_id" element={<ShoesDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
