import { useEffect, useState } from "react";
import { deleteEmployee, listEmployees } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    getAllEmployee();
  }, []);

  const getAllEmployee = () => {
    listEmployees()
      .then((response) => {
        const { data } = response;
        if (data?.success) {
          setEmployees(data?.data?.items);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const addNewEmployee = () => {
    navigator("/add-employee");
  };

  const updateEmployee = (id) => {
    navigator(`/edit-employee/${id}`);
  };

  const removeEmployee = (id) => {
    deleteEmployee(id)
      .then(() => {
        getAllEmployee();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const viewEmployee = (id) => {
    navigator(`/view-employee/${id}`);
  };
  return (
    <div className="container">
      <h2 className="text-center">List of Employees</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>EmpNo</th>
            <th>EmpName</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.empNo}>
              <td>{employee.empNo}</td>
              <td>{employee.empName}</td>
              <td>{employee.position}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateEmployee(employee.empNo)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => removeEmployee(employee.empNo)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-info ms-2"
                  onClick={() => viewEmployee(employee.empNo)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
