import { Link, useNavigate } from "react-router-dom";
import { logoutApiCall } from "../services/UserService";
import { useState } from "react";
const HeaderComponent = () => {
  const navigator = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("token"));

  const handleLogout = () => {
    logoutApiCall().then(() => {
      localStorage.removeItem("token");
      setUser(false);
      navigator("/");
    });
  };
  return (
    <div>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Employee Management System
          </a>
          {localStorage.getItem("token") ? (
            <button className="btn btn-light" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link className="btn btn-light" to={"/login"}>
              Login
            </Link>
          )}
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;
