import "./App.css";
// import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import LoginComponent from "./components/LoginComponent";
import HomeComponent from "./components/HomeComponent";
import ProductComponent from "./components/ProductComponent";
import ProductManageComponent from "./components/ProductManageComponent";
import ViewProductComponent from "./components/ViewProductComponent";
import ListProductComponent from "./components/ListProductComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* //http://localhost:3000 */}
          <Route path="/" element={<HomeComponent />}></Route>

          {/* http://localhost:3000/employees */}
          <Route path="/home" element={<HomeComponent />}></Route>

          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
          {/* http://localhost:3000/add-employee */}
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>

          {/* http://localhost:3000/edit-employee/1 */}
          <Route
            path="/edit-employee/:id"
            element={<EmployeeComponent />}
          ></Route>

          {/* http://localhost:3000/view-employee/1 */}
          <Route
            path="/view-employee/:id"
            element={<ViewEmployeeComponent />}
          ></Route>
          {/* http://localhost:3000/login */}
          <Route path="/login" element={<LoginComponent />}></Route>
          <Route path="/product" element={<ProductComponent />}></Route>
          <Route path="/products" element={<ListProductComponent />}></Route>
          <Route
            path="/view-product/:id"
            element={<ViewProductComponent />}
          ></Route>
          <Route
            path="/add-product"
            element={<ProductManageComponent />}
          ></Route>
          <Route
            path="/edit-product/:id"
            element={<ProductManageComponent />}
          ></Route>
        </Routes>
        {/* <FooterComponent /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
