import { useEffect, useState } from "react";
import {
  createProduct,
  getProduct,
  updateProduct,
} from "../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import { uploadFile } from "../services/FileService";
import InputNumber from "react-input-number";

const ProductManageComponent = () => {
  const [product, setProduct] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  const [errors, setErrors] = useState({
    name: "",
    price: "",
    amount: "",
    imgUrl: "",
  });
  const navigator = useNavigate();
  const { id } = useParams();

  // const [message, setMessage] = useState("");

  const handleFileChange = async (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const addOrUpdateProduct = async (e) => {
    e.preventDefault();
    const response = await uploadFile(selectedFile);
    if (validateForm()) {
      if (id) {
        updateProduct({ ...product, imgUrl: response.data?.data })
          .then((response) => {
            const data = response.data;
            if (data?.success) {
              navigator("/products");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createProduct({ ...product, imgUrl: response.data?.data })
          .then((response) => {
            navigator("/products");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  useEffect(() => {
    if (id) {
      getProduct(id)
        .then((response) => {
          const data = response.data;
          if (data?.success) {
            setProduct(data?.data);
            // setPassword(data?.data.imgUrl);
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
    if (product?.name.trim()) {
      errorsCopy.name = "";
    } else {
      errorsCopy.name = "name is required";
      valid = false;
    }

    if (product?.price) {
      errorsCopy.price = "";
    } else {
      errorsCopy.price = "Price is required";
      valid = false;
    }

    if (product?.amount) {
      errorsCopy.amount = "";
    } else {
      errorsCopy.amount = "Amount is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update product</h2>;
    } else {
      return <h2 className="text-center">Add product</h2>;
    }
  };

  const changeButton = () => {
    if (id) {
      return (
        <button className="btn btn-success" onClick={addOrUpdateProduct}>
          Update
        </button>
      );
    } else {
      return (
        <button className="btn btn-success" onClick={addOrUpdateProduct}>
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
                <label className="form-label">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  value={product?.name}
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  onChange={(e) =>
                    setProduct((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">price</label>
                <InputNumber
                  min={0}
                  placeholder="Enter price"
                  value={product?.price}
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      price: e,
                    }))
                  }
                />
                {errors.price && (
                  <div className="invalid-feedback">{errors.price}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Amount</label>
                <InputNumber
                  min={0}
                  placeholder="Enter amount"
                  name="amount"
                  value={product?.amount}
                  className={`form-control ${
                    errors.amount ? "is-invalid" : ""
                  }`}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,
                      amount: e,
                    }))
                  }
                />
                {errors.amount && (
                  <div className="invalid-feedback">{errors.amount}</div>
                )}
              </div>

              {/* <button className="btn btn-success" onClick={addOrUpdateProduct}>
                Add
              </button> */}
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
                  {product?.imgUrl && (
                    <img
                      src={`http://localhost:9000/api/files/${product?.imgUrl}`}
                      alt={product?.name}
                      width={150}
                    />
                  )}
                </div>
              </>
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

export default ProductManageComponent;
