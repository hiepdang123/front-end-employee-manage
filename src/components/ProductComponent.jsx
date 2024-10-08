import { useEffect, useState } from "react";
import SearchComponent from "./SearchComponent";
import ShowCourseComponent from "./ShowCourseComponent";
import UserCartComponent from "./UserCartComponent";
import { listProducts, listProductsByIds } from "../services/ProductService";
import { createOrder } from "../services/OrderService";

const ProductComponent = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      name: "GFG T-shirt",
      price: 499,
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 2,
      name: "GFG Bag",
      price: 699,
      image:
        "data:image/jpeg;base64,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",
    },
    {
      id: 3,
      name: "GFG Hoodie",
      price: 799,
      image:
        "data:image/jpeg;base64,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",
    },
  ]);

  const [cartCourses, setCartCourses] = useState([]);
  const [searchCourse, setSearchCourse] = useState("");

  useEffect(() => {
    getAllProductByIds();
    getAllProduct();
  }, []);

  const getAllProductByIds = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const ids = cart.map((item) => item.id);
    listProductsByIds(ids)
      .then((response) => {
        const { data } = response;
        if (data?.success) {
          const arrCart = data?.data?.items;
          setCartCourses(
            arrCart.map((item) => ({
              ...item,
              quantity: cart.find((i) => i.id === item.id)?.quantity || 0,
            }))
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getAllProduct = () => {
    listProducts()
      .then((response) => {
        const { data } = response;
        if (data?.success) {
          setCourses(data?.data?.items);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addCourseToCartFunction = (GFGcourse) => {
    let cart = [];
    let arrCart = JSON.parse(localStorage.getItem("cart")) || [];
    const alreadyCourses = cartCourses.find((item) => item.id === GFGcourse.id);
    if (alreadyCourses) {
      cart = arrCart.map((item) =>
        item.id === GFGcourse.id
          ? {
              id: item.id,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      cart = [...arrCart, { id: GFGcourse.id, quantity: 1 }];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    getAllProductByIds();
  };

  const deleteCourseFromCartFunction = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    const newCart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    // let total = total - product.qty * product.price;
    getAllProductByIds();
  };

  const totalAmountCalculationFunction = () => {
    return cartCourses.reduce(
      (total, item) => total + item?.price * item.quantity,
      0
    );
  };

  const courseSearchUserFunction = (event) => {
    setSearchCourse(event.target.value);
  };

  const filterCourseFunction = courses.filter((course) =>
    course.name.toLowerCase().includes(searchCourse.toLowerCase())
  );

  const payment = () => {
    createOrder({ orders: cartCourses })
      .then((response) => {
        const { data } = response;
        if (data?.success) {
          setCartCourses([]);
          localStorage.removeItem("cart");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      <SearchComponent
        searchCourse={searchCourse}
        courseSearchUserFunction={courseSearchUserFunction}
      />
      <main className="App-main">
        <ShowCourseComponent
          courses={courses}
          filterCourseFunction={filterCourseFunction}
          addCourseToCartFunction={addCourseToCartFunction}
        />

        <UserCartComponent
          cartCourses={cartCourses}
          deleteCourseFromCartFunction={deleteCourseFromCartFunction}
          totalAmountCalculationFunction={totalAmountCalculationFunction}
          setCartCourses={setCartCourses}
          payment={payment}
        />
      </main>
    </div>
  );
};

export default ProductComponent;
