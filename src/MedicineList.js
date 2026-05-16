import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function MedicineList() {

  const navigate = useNavigate();

  const [medicines, setMedicines] = useState([]);

  const API = "http://localhost:8080/medicines";

  const triggered = useRef({});

  // load medicines
  useEffect(() => {

    fetch(API)
      .then(res => res.json())
      .then(data => setMedicines(data))
      .catch(err =>
        console.error("Failed to load medicines", err)
      );

  }, []);

  // delete medicine
  const deleteMedicine = async (id) => {

    try {

      await fetch(`${API}/${id}`, {
        method: "DELETE"
      });

      setMedicines(prev =>
        prev.filter(m => m.id !== id)
      );

    } catch (error) {

      console.error("Delete failed", error);

    }

  };

  // mark as taken
  const toggleTaken = (id) => {

    setMedicines(prev =>
      prev.map(m =>
        m.id === id
          ? { ...m, taken: !m.taken }
          : m
      )
    );

  };

  // reminder checker
  useEffect(() => {

    const interval = setInterval(() => {

      const now = new Date();

      const currentHours =
        now.getHours().toString().padStart(2, "0");

      const currentMinutes =
        now.getMinutes().toString().padStart(2, "0");

      const currentTime =
        currentHours + ":" + currentMinutes;

      medicines.forEach((m) => {

        const key = m.id + "_" + currentTime;

        if (
          m.time.trim() === currentTime.trim() &&
          !triggered.current[key]
        ) {

          alert(`💊 Time to take ${m.name}`);

          triggered.current[key] = true;

        }

      });

    }, 60000);

    return () => clearInterval(interval);

  }, [medicines]);

  return (

    <div className="app">

      <div className="card">

        <h1>💊 Medicine List</h1>

        {medicines.length === 0 ? (

          <p style={{ textAlign: "center" }}>
            No medicines added
          </p>

        ) : (

          medicines.map((m) => (

            <div
              className={`medicine ${m.taken ? "taken" : ""}`}
              key={m.id}
            >

              <div>

                <strong>{m.name}</strong>

                <p>
                  {m.dosage} | {m.frequency}
                </p>

                <p>
                  ⏰ {m.time}
                </p>

              </div>

              <div>

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/edit/${m.id}`)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteMedicine(m.id)
                  }
                >
                  Delete
                </button>

                <button
                  className="taken-btn"
                  onClick={() =>
                    toggleTaken(m.id)
                  }
                >
                  {m.taken
                    ? "✅ Taken"
                    : "Mark as Taken"}
                </button>

              </div>

            </div>

          ))

        )}

        <Link to="/">

          <button className="add-btn">
            ➕ Add Medicine
          </button>

        </Link>

      </div>

    </div>

  );

}

export default MedicineList;