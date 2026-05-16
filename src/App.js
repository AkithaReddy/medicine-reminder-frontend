import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddMedicine from "./AddMedicine";
import MedicineList from "./MedicineList";
import EditMedicine from "./EditMedicine";
import "./App.css";

function App() {

  useEffect(() => {

    if ("Notification" in window) {

      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      }

    }

  }, []);

  return (
    <Router>

      <Routes>
        <Route path="/" element={<AddMedicine />} />
        <Route path="/list" element={<MedicineList />} />
        <Route path="/edit/:id" element={<EditMedicine />} />
      </Routes>

    </Router>
  );
}

export default App;