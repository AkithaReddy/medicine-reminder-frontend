import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMedicine() {

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState("");

  const navigate = useNavigate();
  const API = "https://medicine-reminder-backend-xuon.onrender.com/medicines";

  const addMedicine = async () => {

    if (!name || !dosage || !frequency || !time) {
      alert("Fill all fields");
      return;
    }

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        dosage,
        frequency,
        time
      })
    });

    // correct page
    navigate("/list");

  };

  return (

    <div className="app">

      <div className="card">

        <h1>💊 Add Medicine</h1>

        <div className="form-group">
          <label>Medicine Name</label>
          <input
            value={name}
            onChange={(e)=>setName(e.target.value)}
            placeholder="Enter medicine"
          />
        </div>

        <div className="form-group">
          <label>Dosage</label>
          <input
            value={dosage}
            onChange={(e)=>setDosage(e.target.value)}
            placeholder="500mg"
          />
        </div>

        <div className="form-group">
          <label>Frequency</label>
          <select
            value={frequency}
            onChange={(e)=>setFrequency(e.target.value)}
          >
            <option value="">Select Frequency</option>
            <option>Once a day</option>
            <option>Twice a day</option>
            <option>Morning</option>
            <option>Afternoon</option>
            <option>Night</option>
          </select>
        </div>

        <div className="form-group">
          <label>Reminder Time</label>
          <input
            type="time"
            value={time}
            onChange={(e)=>setTime(e.target.value)}
          />
        </div>

        <button className="add-btn" onClick={addMedicine}>
          Add Medicine
        </button>

      </div>

    </div>
  );
}

export default AddMedicine;