import { useEffect, useState } from "react";
import { deleteProduct, listProducts } from "../services/ProductService";
import { useNavigate } from "react-router-dom";

const ListProductComponent = () => {
  const [products, setProducts] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = () => {
    listProducts()
      .then((response) => {
        const { data } = response;
        if (data?.success) {
          setProducts(data?.data?.items);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const addNewProduct = () => {
    navigator("/add-product");
  };

  const updateProduct = (id) => {
    navigator(`/edit-product/${id}`);
  };

  const removeProduct = (id) => {
    deleteProduct(id)
      .then(() => {
        getAllProduct();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const viewProduct = (id) => {
    navigator(`/view-product/${id}`);
  };
  return (
    <div className="container">
      <h2 className="text-center">List of Products</h2>
      <button className="btn btn-primary mb-2" onClick={addNewProduct}>
        Add product
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.name}>
              <td>{product.name}</td>
              <td>
                <img
                  src={`http://localhost:9000/api/files/${product?.imgUrl}`}
                  alt={product.name}
                  width={150}
                />
              </td>
              <td>{product.price}</td>
              <td>{product.amount}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => updateProduct(product.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => removeProduct(product.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-info ms-2"
                  onClick={() => viewProduct(product.id)}
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

export default ListProductComponent;
