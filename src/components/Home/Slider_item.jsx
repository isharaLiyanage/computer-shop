import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import headset from "../../assets/img/headset.png";

function Slider_item() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
  };

  return (
    <div>
      <Slider {...settings}>
        <div className="  h-[300px]  ">
          <div className="flex relative justify-around h-[280px] bg-[#BBDDCB]">
            <div className="item01-slider absolute"></div>
            <div className=" text-right relative">
              <h3 className=" z-10 text-[45px] sm:text-[35px] md:text-[42px] text-[#4B0C88]">
                Limited time offer,
              </h3>
              <h3 className=" text-[25px] sm:text-[45px] md:text-[68px] text-black">
                Don't miss out!
              </h3>
            </div>
            <div className="img">
              <img
                className=" rotate-[-11deg] object-contain h-[332px]"
                src={headset}
                alt="headset img"
              />
            </div>
          </div>
        </div>

        <div className="   h-[300px]  bg-orange-900"></div>

        <div className="   h-[300px] bg-slate-800"></div>
      </Slider>
    </div>
  );
}
export default Slider_item;
