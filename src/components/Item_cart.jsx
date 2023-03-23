import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Product/Rating";

function Item_cart({ item }) {
  return (
    <div className=" snap-start">
      <div className="w-[255px] h-[314px] border-2  rounded-md">
        <div className="w-[255px] h-[231px]  m-auto rounded-md bg-[#D9D9D9] relative ">
          <Link to={`/products/${item._id}`} className="  cursor-pointer">
            <img
              src={item.img[0]}
              className=" w-[255px] h-[231px] object-cover"
              alt=""
            />
          </Link>
        </div>
        <Link to={`/products/${item._id}`} className=" z-50 cursor-pointer">
          <h3 className=" text-black font-bold  overflow-hidden whitespace-nowrap text-ellipsis px-1">
            {item.title}
          </h3>
        </Link>
        <div className="flex pl-2">
          <Rating rating={item.rating} />
        </div>
        <div className="flex p-1 px-3 justify-between">
          <h2 className=" font-bold">${item.price}</h2>
        </div>
      </div>
    </div>
  );
}

export default Item_cart;
