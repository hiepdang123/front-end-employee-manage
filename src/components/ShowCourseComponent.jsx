/* eslint-disable react/prop-types */

//components/ShowCourseComponent.js
// eslint-disable-next-line no-unused-vars
function ShowCourseComponent({
  courses,
  filterCourseFunction,
  addCourseToCartFunction,
}) {
  return (
    <div className="product-list">
      {filterCourseFunction.length === 0 ? (
        <p className="no-results">Sorry Geek, No matching Product found.</p>
      ) : (
        filterCourseFunction.map((product) => {
          return (
            <div className="product" key={product.id}>
              <img
                src={`http://localhost:9000/api/files/${product?.imgUrl}`}
                alt={product.name}
              />
              <h2>{product.name}</h2>
              <p>Price: ₹{product.price}</p>
              <button
                className="add-to-cart-button"
                onClick={() => addCourseToCartFunction(product)}
              >
                Add to Shopping Cart
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ShowCourseComponent;
