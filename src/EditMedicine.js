import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditMedicine() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [time, setTime] = useState("");

  const API = "https://medicine-reminder-backend-inuf.onrender.com/medicines";

  useEffect(() => {

    const loadMedicine = async () => {

      try {

        const res = await fetch(`${API}/${id}`);

        if (!res.ok) {
          throw new Error("Failed to load medicine");
        }

        const data = await res.json();

        setName(data.name || "");
        setDosage(data.dosage || "");
        setFrequency(data.frequency || "");
        setTime(data.time || "");

      } catch (error) {

        console.error("Error fetching medicine:", error);

      }

    };

    if (id) {
      loadMedicine();
    }

  }, [id]);

  const updateMedicine = async () => {

    try {

      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
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

      if (!res.ok) {
        throw new Error("Update failed");
      }

      navigate("/list");

    } catch (error) {

      console.error("Error updating medicine:", error);

    }

  };

  return (

    <div className="app">

      <div className="card">

        <h1>✏ Edit Medicine</h1>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
        />

        <input
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />

        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <button onClick={updateMedicine}>
          Update Medicine
        </button>

      </div>

    </div>

  );

}

export default EditMedicine;