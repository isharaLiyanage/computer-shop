import React from "react";
import { useDispatch, useSelector } from "react-redux";
import laptop from "../assets/img/laptop.png";
import "../App.css";
import { Reset } from "../Redux/CartSlice";
import { Link } from "react-router-dom";
function Cart({ cartOpen }) {
  const dispatch = useDispatch();
  function handelClick() {
    cartOpen(true) ? cartOpen(true) : cartOpen(false);
  }
  const cartItems = useSelector((state) => state.Cart);
  const userId = useSelector((state) => state.User?.Auth._id);

  const handelClear = () => {
    dispatch(Reset());
  };
  return (
    <div>
      <div className=" z-30 relative w-[300px] bg-slate-100">
        <div
          className=" absolute cursor-pointer  top-3 right-3"
          onClick={handelClick}
        >
          X
        </div>
        <h5 className=" mt-3 m-5 text-[20px]">Cart</h5>
        <div className=" border-b border-slate-700 px-2 w-full"></div>
        <div
          className={` overflow-y-scroll scroll-bars ${
            cartItems.quantity > 0 ? "h-60" : "h-16"
          }`}
        >
          {cartItems.quantity > 0 ? (
            cartItems.products.map((item) => (
              <div
                className="border-b relative border-slate-700 px-2"
                key={Math.random()}
              >
                <div className="absolute top-0 right-1"></div>
                <div className="flex  py-2 items-center">
                  <div className=" w-4/12">
                    <img
                      src={item.itemImg}
                      className=" object-contain"
                      alt=""
                    />
                  </div>

                  <div className="w-8/12">
                    <div className="flex justify-between ">
                      <div className="">
                        <h3>{item.itemTitle}</h3>
                      </div>
                      <div className=""></div>
                    </div>
                    <div className="flex justify-between ">
                      <div className="">
                        <h4>${item.itemPrice}</h4>
                      </div>
                      <h4> Quantity: {item.itemQuantity}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Cart is empty.</p>
          )}
        </div>
        <div className=" py-2 ">
          <div className=" text-gray-700">
            <p>Total Quantity : {cartItems.quantity}</p>
          </div>
          <div className="">
            <p>Total Price : ${cartItems.total}</p>
          </div>
        </div>
        <div className="flex py-2 justify-around">
          <div className="">
            <button
              className=" border-2 border-gray-500 px-3 "
              onClick={handelClear}
            >
              Clear
            </button>
          </div>
          <div className="">
            <Link to={`/checkout/${userId}`}>
              <button className=" border-2 border-gray-900 px-3  bg-slate-900 text-white">
                {" "}
                Check Out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
