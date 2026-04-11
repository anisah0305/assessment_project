import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole") || "student";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/");
      } else {
        setUser(currentUser);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-card">
        <h1>GPT-Human Assessment Dashboard</h1>
        <p>Welcome to the prototype platform.</p>

        <div className="dashboard-info">
          <p><strong>Name:</strong> {user?.displayName || "No name available"}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {role}</p>
        </div>

        <button className="main-auth-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;