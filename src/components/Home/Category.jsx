import React from "react";

import Processors from "../../assets/img/processer.png";
import keyboard from "../../assets/img/keyboard.png";
import laptop from "../../assets/img/laptop.png";
import gpu from "../../assets/img/gpu.png";
import pc from "../../assets/img/pc.png";
import { Link } from "react-router-dom";

function Category() {
  return (
    <div className="p-5">
      <h3 className=" text-center font-bold text-[26]">Category</h3>
      <div className=" bg-[#DADADA] p-5">
        <div className="flex flex-wrap md:flex-nowrap justify-between">
          <Link to={"/products/cat/Pc Computer"}>
            <div className="">
              <img
                className=" object-contain h-[100px] sm:h-[200px]"
                src={pc}
                alt=""
              />
              <p className=" text-[16px] text-center">PC Computer</p>
            </div>
          </Link>
          <Link to={"/products/cat/Graphics Card"}>
            <div className="">
              <img
                className=" object-contain h-[100px] sm:h-[200px]"
                src={gpu}
                alt=""
              />
              <p className=" text-[16px] text-center">Graphics card(vga)</p>
            </div>{" "}
          </Link>

          <Link to={"/products/cat/Processors"}>
            <div className="">
              <img
                className=" object-contain h-[100px] sm:h-[200px]"
                src={Processors}
                alt=""
              />
              <p className=" text-[16px] text-center">Processors</p>
            </div>
          </Link>

          <Link to={"/products/cat/Laptops"}>
            <div className="">
              <img
                className=" object-contain h-[100px] sm:h-[200px]"
                src={laptop}
                alt=""
              />
              <p className=" text-[16px] text-center">Laptops</p>
            </div>{" "}
          </Link>

          <Link to={"/products/cat/Keyboard & Mouse "}>
            <div className="">
              <img
                className=" object-contain h-[100px] sm:h-[200px]"
                src={keyboard}
                alt=""
              />
              <p className=" text-[16px] text-center">Keyboard & Mouse </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Category;
