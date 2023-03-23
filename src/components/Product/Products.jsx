import React, { useState } from "react";

import HeartIconSolid from "@heroicons/react/solid/HeartIcon";
import { Link } from "react-router-dom";

import HeartIcon from "@heroicons/react/outline/HeartIcon";
import Item_cart from "../Item_cart";
import Rating from "./Rating";

function Products({ data }) {
  console.log(data);
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked(!liked);
  };

  return (
    <div className=" flex flex-wrap justify-between gap-1">
      {Array.isArray(data) ? (
        data.map((item) => (
          <div className=" snap-start" key={item._id}>
            <div className="w-[255px] h-[314px] border-2  rounded-md">
              <div className="w-[255px] h-[231px]  m-auto rounded-md bg-[#D9D9D9] relative ">
                <Link
                  to={`/products/${item._id}`}
                  className=" z-50 cursor-pointer"
                >
                  <img
                    src={item.img[0]}
                    className=" w-[255px] h-[231px] object-cover"
                    alt=""
                  />
                </Link>
                {/* <div
                  className={`w-6 h-6 border-black border rounded-full absolute top-0 right-0 flex items-center justify-center cursor-pointer ${
                    liked ? "bg-black text-white" : ""
                  }`}
                  onClick={handleClick}
                >
                  {liked ? (
                    <HeartIconSolid className="h-3 w-3" />
                  ) : (
                    <HeartIcon className="h-3 w-3" />
                  )}
                </div> */}
              </div>
              <Link
                to={`/products/${item._id}`}
                className=" z-50 cursor-pointer"
              >
                <h3 className="  overflow-hidden whitespace-nowrap text-ellipsis px-1">
                  {item.title}
                </h3>
              </Link>
              <div className="flex pl-2">
                <Rating rating={item.rating} />
              </div>
              <div className="flex p-1 px-3 justify-between">
                <h2 className=" font-bold">$ {item.price}</h2>
                <button className=" rounded-md border-2 bg-none px-2">
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Products;
