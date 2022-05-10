import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = localStorage.getItem("user");

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user]);

  return <div>Dashboard</div>;
}

export default Dashboard;
