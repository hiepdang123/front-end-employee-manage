import { useEffect, useState } from "react";
import { getEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const ViewEmployeeComponent = () => {
  const [employee, setEmployee] = useState({});
  const { id } = useParams();
  const navigator = useNavigate();
  useEffect(() => {
    getEmployeeById(id);
  });
  const getEmployeeById = (id) => {
    getEmployee(id)
      .then((response) => {
        const data = response.data;
        if (data?.success) {
          setEmployee(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleForward = () => {
    navigator("/");
  };
  return (
    <div>
      <div className="card col-md-6 offset-md-3 mt-3">
        <h3 className="text-center">View Employee Detail</h3>
        <div className="card-body">
          <div className="row">
            <label className="fw-bold">EmpNo: </label>
            <span>{employee.empNo}</span>
          </div>
          <div className="row">
            <label className="fw-bold">EmpName: </label>
            <span>{employee.empName}</span>
          </div>
          <div className="row">
            <label className="fw-bold">Position: </label>
            <span>{employee.position}</span>
          </div>
          <button className="btn btn-info" onClick={handleForward}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeComponent;
