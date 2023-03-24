import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

import user from "../assets/img/user.png";
import cart from "../assets/img/cart.png";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import Search from "./Search";
import "../App.css";
function NavBar() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(false);

  const quantity = useSelector((state) => state.Cart.quantity);
  const username = useSelector((state) => state.User.Auth?.username);
  const id = useSelector((state) => state.User.Auth?._id);

  const userImg = useSelector((state) => state.User.Auth?.img);

  function CartOpenFunction(props) {
    props === true ? setCartOpen(true) : setCartOpen(false);
  }
  const handelSearch = (e) => {
    setSearchOpen(true);
    setSearchValue(e.target.value);
  };
  return (
    <div className=" relative ">
      <div className="flex justify-around h-[50px] bg-[#BBDDCB] shadow-md m-auto ">
        <Link to="/">
          {" "}
          <div className=" w-[213px] overflow-hidden ">
            {" "}
            <img className=" mt-2 ml-2" src={logo} alt="" />
          </div>{" "}
        </Link>
        <div className="hidden  md:flex justify-center items-center">
          <input
            className=" search w-[514px] h-[37px] rounded-[21px] p-0 bg-white border-green-800"
            placeholder="What are you looking for today?"
            type="search"
            onChange={handelSearch}
          />
        </div>
        <div className="flex items-center justify-center">
          <div className="">
            <div className="">
              <div className={username ? "hidden" : "block"}>
                <Link to="/auth">
                  <p>SIGN IN</p>
                </Link>
              </div>
              <Link to={`/user/${id}`}>
                <h3 className={username ? "block" : "hidden"}>
                  {username ? username : ""}
                </h3>{" "}
              </Link>
            </div>
          </div>
          <Link to={`/user/${id}`}>
            <div className="">
              <img
                className=" w-[35px] rounded-full "
                src={userImg ? userImg : user}
                alt=""
              />
            </div>
          </Link>
          <div
            className=" cursor-pointer relative"
            onClick={() => {
              setCartOpen(!cartOpen);
            }}
          >
            <img className=" w-[35px]" src={cart} alt="" />
            <div className={quantity === 0 ? "hidden" : "block"}>
              <div className=" absolute -top-1 right-0 text-[12px] font-bold z-20 bg-[#0ca1a1] text-white rounded-full px-2">
                {quantity}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden   w-4/6  m-auto py-1 flex justify-center items-center">
        <input
          className=" search w-[514px] h-[37px] rounded-[21px] p-0 border-green-300"
          placeholder="What are you looking for today?"
          type="search"
          onChange={handelSearch}
        />
      </div>
      <div className={cartOpen ? "block" : "hidden"}>
        <div className="  absolute right-3 top-[50px]">
          <Cart cartOpen={CartOpenFunction} />
        </div>
      </div>
      <div
        className={searchOpen && searchValue.length > 0 ? "block" : "hidden"}
      >
        <div className=" mt-10 sm:mt-0 z-50 absolute  right-1/2  translate-x-1/2 w-[514px]   top-[50px]">
          <Search value={searchValue} />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
