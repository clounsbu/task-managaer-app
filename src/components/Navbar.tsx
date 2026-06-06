import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth0();
  const onLoginPage = location.pathname === "/login";

  return (
    <nav>
      <h1 className="text-center title">Task Manager App</h1>
      {isAuthenticated ? (
        <div className="d-flex justify-content-end align-items-center gap-2">
          <span>Welcome, {user?.name}</span>
          <LogoutButton />
        </div>
      ) : (
        <div>{!onLoginPage && <LoginButton />}</div>
      )}
    </nav>
  );
}
