import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApiCall } from "../services/UserService";

const LoginComponent = () => {
  const [empNo, setEmpNo] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigator = useNavigate();
  const handleCancelButton = () => {
    navigator("/");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      empNo,
      password,
    };
    loginApiCall(user)
      .then((response) => {
        const res = response.data;
        if (res.success) {
          localStorage.setItem("token", res.data);
          navigator("/employees");
        } else {
          setLoginError("Tài khoản hoặc mật khẩu không chính xác");
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        setLoginError(error.response.data);
      });
  };
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="card col-md-6 offset-md-3">
          <h2 className="text-center">Login</h2>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">empNo</label>
                <input
                  type="text"
                  placeholder="Enter empNo"
                  name="empNo"
                  className="form-control"
                  value={empNo}
                  onChange={(e) => setEmpNo(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loginError ? (
                <div className="text-center text-danger">{loginError}</div>
              ) : (
                ""
              )}

              <button className="btn btn-success" onClick={handleSubmit}>
                Login
              </button>
              <button
                className="btn btn-warning ms-2"
                onClick={handleCancelButton}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
