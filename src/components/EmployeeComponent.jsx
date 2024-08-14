import { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";
import { uploadFile } from "../services/FileService";

const EmployeeComponent = () => {
  const [employee, setEmployee] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const [errors, setErrors] = useState({
    empNo: "",
    empName: "",
    position: "",
    password: "",
  });
  const navigator = useNavigate();
  const { id } = useParams();

  // const [message, setMessage] = useState("");

  const handleFileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const addOrUpdateEmployee = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (id) {
        const response = await uploadFile(selectedFile);
        updateEmployee({ ...employee, photoUrl: response.data?.data })
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
            setEmployee(data?.data);
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
    if (employee.empNo.trim()) {
      errorsCopy.empNo = "";
    } else {
      errorsCopy.empNo = "empNo is required";
      valid = false;
    }

    if (employee.empName.trim()) {
      errorsCopy.empName = "";
    } else {
      errorsCopy.empName = "EmpName is required";
      valid = false;
    }

    if (employee.position.trim()) {
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
                  value={employee?.empNo}
                  className={`form-control ${errors.empNo ? "is-invalid" : ""}`}
                  onChange={(e) =>
                    setEmployee((prev) => ({ ...prev, empNo: e.target.value }))
                  }
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
                  value={employee?.empName}
                  className={`form-control ${
                    errors.empName ? "is-invalid" : ""
                  }`}
                  onChange={(e) =>
                    setEmployee((prev) => ({
                      ...prev,
                      empName: e.target.value,
                    }))
                  }
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
                  value={employee?.position}
                  className={`form-control ${
                    errors.position ? "is-invalid" : ""
                  }`}
                  onChange={(e) =>
                    setEmployee((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                />
                {errors.position && (
                  <div className="invalid-feedback">{errors.position}</div>
                )}
              </div>

              {/* <button className="btn btn-success" onClick={addOrUpdateEmployee}>
                Add
              </button> */}
              {id ? (
                <>
                  <div className="form-group mb-2">
                    <div className="form-group">
                      <label>Avatar</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleFileChange}
                      />
                    </div>
                    {employee?.photoUrl && (
                      <img
                        src={`http://localhost:9000/api/files/${employee?.photoUrl}`}
                        alt={employee?.empName}
                        width={150}
                      />
                    )}
                  </div>
                </>
              ) : (
                <div className="form-group mb-2">
                  <label className="form-label">Password</label>
                  <input
                    type="text"
                    placeholder="Enter password"
                    name="password"
                    value={employee?.password}
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    onChange={(e) =>
                      setEmployee((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
              )}
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
