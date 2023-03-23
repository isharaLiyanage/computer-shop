import React from "react";
import Brand, { BrandInline } from "./Brand";

import Slider_item from "./Slider_item";

function Slider() {
  return (
    <div>
      <BrandInline />
      <div className="flex">
        <div className=" hidden sm:block w-1/4">
          <h3 className=" text-[16px] font-bold pl-2">Popular Brand with us</h3>
          <Brand />
        </div>
        <div className=" w-11/12 m-auto sm:w-3/4">
          <div className="slider ">
            <Slider_item />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
