//components/UserCartComponent.js
function UserCartComponent({
  // eslint-disable-next-line react/prop-types
  cartCourses,
  // eslint-disable-next-line react/prop-types
  deleteCourseFromCartFunction,
  // eslint-disable-next-line react/prop-types
  totalAmountCalculationFunction,
  // eslint-disable-next-line react/prop-types
  setCartCourses,
  payment,
}) {
  return (
    <div className={`cart ${cartCourses.length > 0 ? "active" : ""}`}>
      <h2>My Cart</h2>
      {cartCourses.length === 0 ? (
        <p className="empty-cart">Geek, your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartCourses.map((item) => {
              return (
                <li key={item?.id} className="cart-item">
                  <div>
                    <div className="item-info">
                      <div className="item-image">
                        <img
                          src={`http://localhost:9000/api/files/${item?.imgUrl}`}
                          alt={item?.name}
                        />
                      </div>
                      <div className="item-details">
                        <h3>{item?.name}</h3>
                        <p>Price: ₹{item?.price}</p>
                      </div>
                    </div>
                    <div>
                      <div className="item-actions">
                        <button
                          className="remove-button"
                          onClick={() => deleteCourseFromCartFunction(item)}
                        >
                          Remove Product
                        </button>
                        <div className="quantity">
                          <button
                            style={{ margin: "1%" }}
                            onClick={(e) => {
                              let arrCart = JSON.parse(
                                localStorage.getItem("cart")
                              );
                              const cart = arrCart.map((prevItem) =>
                                prevItem?.id === item?.id
                                  ? {
                                      ...prevItem,
                                      quantity: Math.min(
                                        item.quantity + 1,
                                        item.amount
                                      ),
                                    }
                                  : prevItem
                              );
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(cart)
                              );
                              setCartCourses((prevCartCourses) => {
                                const updatedCart = prevCartCourses.map(
                                  (prevItem) =>
                                    prevItem?.id === item?.id
                                      ? {
                                          ...prevItem,
                                          quantity: Math.min(
                                            item.quantity + 1,
                                            item.amount
                                          ),
                                        }
                                      : prevItem
                                );
                                return updatedCart;
                              });
                            }}
                          >
                            +
                          </button>
                          <p className="quant">{item?.quantity} </p>
                          <button
                            onClick={(e) => {
                              setCartCourses((prevCartCourses) => {
                                let arrCart = JSON.parse(
                                  localStorage.getItem("cart")
                                );
                                const cart = arrCart.map((prevItem) =>
                                  prevItem?.id === item?.id
                                    ? {
                                        ...prevItem,
                                        quantity: Math.min(
                                          item.quantity + 1,
                                          item.amount
                                        ),
                                      }
                                    : prevItem
                                );
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify(cart)
                                );
                                const updatedCart = prevCartCourses.map(
                                  (prevItem) =>
                                    prevItem?.id === item?.id
                                      ? {
                                          ...prevItem,
                                          quantity: Math.max(
                                            item.quantity - 1,
                                            0
                                          ),
                                        }
                                      : prevItem
                                );
                                return updatedCart;
                              });
                            }}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="checkout-section">
            <div className="checkout-total">
              <p className="total">
                Total Amount: ₹{totalAmountCalculationFunction()}
              </p>
            </div>
            <button
              className="checkout-button"
              disabled={
                cartCourses.length === 0 ||
                totalAmountCalculationFunction() === 0
              }
              onClick={payment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserCartComponent;
