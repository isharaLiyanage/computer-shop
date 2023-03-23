import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "react-router-dom";
import { UserSend } from "../Axios";
import { Reset } from "../Redux/CartSlice";

function Checkout() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState();

  const Cart = useSelector((state) => state.Cart?.products);

  const Details = useSelector((state) => state?.Cart);
  const quantity = Details.quantity;
  const total = Details.total;

  const userId = useSelector((state) => state.User?.Auth._id);
  const address = useSelector((state) => state.User?.Auth);

  const put_address01 = useRef();
  const put_address02 = useRef();
  const put_city = useRef();
  const put_state = useRef();
  const put_country = useRef();

  const handelClick = (e) => {
    e.preventDefault();

    let line01;
    if (put_address01.current.value) {
      line01 = put_address01.current.value;
    } else {
      line01 = address.address.line01;
    }
    let line02;
    if (put_address02.current.value) {
      line02 = put_address02.current.value;
    } else {
      line02 = address.address.line02;
    }
    let city;
    if (put_city.current.value) {
      city = put_city.current.value;
    } else {
      city = address.address.city;
    }
    let state;
    if (put_state.current.value) {
      state = put_state.current.value;
    } else {
      state = address.address.state;
    }
    let country;
    if (put_country.current.value) {
      country = put_country.current.value;
    } else {
      country = address.address.country;
    }

    async function ConformOrder() {
      try {
        const res = await UserSend.post("/api/orders/", {
          userId,
          product: Cart.map((product) => ({
            productId: product.productId,
            quantity: product.itemQuantity,
          })),
          amount: total,
          address: {
            lineOne: line01,
            lineTwo: line02,
            city,
            State: state,
            Country: country,
          },
        });
        setOrders(res.data);
        dispatch(Reset());
        redirect("/user");
      } catch (err) {
        console.log(err);
      }
    }
    ConformOrder();
  };
  return (
    <div className=" mt-6">
      {Cart ? (
        <div className="">
          <table className=" customers m-auto">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th className="">Quantity</th>

                <th>Price</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {Cart.map((product) => (
                <tr key={product.productId}>
                  <td>
                    <img
                      className=" w-12"
                      src={product.itemImg}
                      alt={product.itemTitle}
                    />
                  </td>
                  <td>{product.itemTitle}</td>
                  <td>{product.itemQuantity}</td>

                  <td>${product.itemPrice}</td>
                  <td>Cash on delivery</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="py-4 w-8/12 m-auto">
            <h3>Total Quantity : {Details.quantity}</h3>
            <h3 className=" ">Total Price : $ {Details.total}</h3>
          </div>
          <div className="flex w-8/12 m-auto justify-between items-center">
            <div className="">
              <h3 className=" font-bold text-lg">Address</h3>
              <div className="flex justify-between">
                <label htmlFor="line01">Line 01 :</label>
                <input
                  type="text"
                  ref={put_address01}
                  name="line01"
                  defaultValue={address.address?.lineOne}
                  className=" w-44 sm:w-56 border-2 border-gray-900"
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="line02">Line 02 :</label>
                <input
                  type="text"
                  ref={put_address02}
                  name="line02"
                  defaultValue={address.address?.lineTwo}
                  className=" w-44 sm:w-56 border-2 border-gray-900"
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="city">City :</label>
                <input
                  type="text"
                  ref={put_city}
                  name="city"
                  className=" w-44 sm:w-56 border-2 border-gray-900"
                  defaultValue={address.address?.city}
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="state">State :</label>
                <input
                  type="text"
                  ref={put_state}
                  name="state"
                  defaultValue={address.address?.State}
                  className=" w-44 sm:w-56 border-2 border-gray-900"
                />
              </div>
              <div className="flex justify-between">
                <label htmlFor="country">Country :</label>
                <input
                  type="text"
                  ref={put_country}
                  name="country"
                  defaultValue={address.address?.Country}
                  className=" w-44 sm:w-56 border-2 border-gray-900"
                />
              </div>
            </div>
            <div className="">
              <button
                onClick={handelClick}
                className=" px-5 py-2 bg-yellow-600 rounded-sm"
              >
                Conform Order
              </button>
              {orders ? (
                <h3 className=" bg-green-500 px-2 mt-2 text-center">
                  Order is Conformed
                </h3>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Checkout;
