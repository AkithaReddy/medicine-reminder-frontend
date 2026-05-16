import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {

  return (
    <div className="container">

      <h1>💊 Medicine Reminder Dashboard</h1>

      <div className="dashboard-buttons">

        <Link to="/add">
          <button className="add-btn">
            ➕ Add Medicine
          </button>
        </Link>

        <Link to="/medicines">
          <button className="view-btn">
            📋 View Medicines
          </button>
        </Link>

      </div>

    </div>
  );
}

export default Dashboard;