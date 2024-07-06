import { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [empNo, setEmpNo] = useState("");
  const [empName, setEmpName] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    empNo: "",
    empName: "",
    position: "",
    password: "",
  });
  const navigator = useNavigate();
  const { id } = useParams();

  const addOrUpdateEmployee = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const employee = {
        empNo,
        empName,
        position,
        password,
      };
      if (id) {
        updateEmployee(employee)
          .then((response) => {
            const data = response.data;
            if (data?.success) {
              navigator("/employees");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          const data = response.data;
          if (data?.success) {
            setEmpNo(data?.data.empNo);
            setEmpName(data?.data.empName);
            setPosition(data?.data.position);
            // setPassword(data?.data.password);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  const validateForm = () => {
    let valid = true;
    const errorsCopy = { ...errors };
    if (empNo.trim()) {
      errorsCopy.empNo = "";
    } else {
      errorsCopy.empNo = "empNo is required";
      valid = false;
    }

    if (empName.trim()) {
      errorsCopy.empName = "";
    } else {
      errorsCopy.empName = "EmpName is required";
      valid = false;
    }

    if (position.trim()) {
      errorsCopy.position = "";
    } else {
      errorsCopy.position = "Position is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update employee</h2>;
    } else {
      return <h2 className="text-center">Add employee</h2>;
    }
  };

  const changeButton = () => {
    if (id) {
      return (
        <button className="btn btn-success" onClick={addOrUpdateEmployee}>
          Update
        </button>
      );
    } else {
      return (
        <button className="btn btn-success" onClick={addOrUpdateEmployee}>
          Add
        </button>
      );
    }
  };

  const handleCancelButton = () => {
    navigator("/");
  };

  return (
    <div className="container">
      <br></br>
      <br></br>
      <div className="row">
        <div className="card col-md-6 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">EmpNo</label>
                <input
                  type="text"
                  placeholder="Enter EmpNo"
                  name="empNo"
                  value={empNo}
                  className={`form-control ${errors.empNo ? "is-invalid" : ""}`}
                  onChange={(e) => setEmpNo(e.target.value)}
                />
                {errors.empNo && (
                  <div className="invalid-feedback">{errors.empNo}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">empName</label>
                <input
                  type="text"
                  placeholder="Enter empName"
                  name="empName"
                  value={empName}
                  className={`form-control ${
                    errors.empName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setEmpName(e.target.value)}
                />
                {errors.empName && (
                  <div className="invalid-feedback">{errors.empName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Position</label>
                <input
                  type="text"
                  placeholder="Enter position"
                  name="position"
                  value={position}
                  className={`form-control ${
                    errors.position ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setPosition(e.target.value)}
                />
                {errors.position && (
                  <div className="invalid-feedback">{errors.position}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Password</label>
                <input
                  type="text"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
              {/* <button className="btn btn-success" onClick={addOrUpdateEmployee}>
                Add
              </button> */}
              {changeButton()}
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

export default EmployeeComponent;
