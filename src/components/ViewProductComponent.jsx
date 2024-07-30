import { useEffect, useState } from "react";
import { getProduct } from "../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";

const ViewProductComponent = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const navigator = useNavigate();
  useEffect(() => {
    getProductById(id);
  });
  const getProductById = (id) => {
    getProduct(id)
      .then((response) => {
        const data = response.data;
        if (data?.success) {
          setProduct(data.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleForward = () => {
    navigator("/products");
  };
  return (
    <div>
      <div className="card col-md-6 offset-md-3 mt-3">
        <h3 className="text-center">View Product Detail</h3>
        <div className="card-body">
          <div className="row">
            <label className="fw-bold">Name: </label>
            <span>{product?.name}</span>
          </div>
          <div className="row">
            <label className="fw-bold">Price: </label>
            <span>{product?.price}</span>
          </div>
          <div className="row">
            <label className="fw-bold">Amount: </label>
            <span>{product?.amount}</span>
          </div>
          <div className="row">
            <label className="fw-bold">Image: </label>
            <img src={`http://localhost:9000/api/files/${product?.imgUrl}`} />
          </div>
          <button className="btn btn-info" onClick={handleForward}>
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewProductComponent;
