import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

export const Home = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>sign out</button>
    </div>
  );
};
