import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MainPage from "./components/MainPage/MainPage.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Animals from "./components/Animals/Animals.jsx";
import Registration from "./components/Registration/Registration.jsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/auth/registration" element={<Registration />} />
      </Routes>
    </>
  );
}
  