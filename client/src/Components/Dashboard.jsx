import React, { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  return (
    <div className="main">
      <h1 className="text">Post List Screen</h1>
    </div>
  );
}
