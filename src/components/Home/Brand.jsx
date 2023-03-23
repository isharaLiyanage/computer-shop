import React, { useState } from "react";
import { Link } from "react-router-dom";

const BrandName = [
  { name: "Intel", id: "1" },
  { name: "Samsung", id: "2" },
  { name: "Logitech", id: "3" },
  { name: "JBL", id: "4" },
  { name: "Sennheiser", id: "5" },
  { name: "Corsair", id: "6" },
  { name: "Bose", id: "7" },
  { name: "Razer", id: "8" },
  { name: "SteelSeries", id: "9" },
  { name: "Harman", id: "10" },
  { name: "Kardon", id: "11" },
];

function BrandInline() {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  // Handle mouse leave event
  const handleMouseLeave = () => {
    setIsDown(false);
  };

  // Handle mouse up event
  const handleMouseUp = () => {
    setIsDown(false);
  };

  // Handle mouse move event
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 1;
    e.currentTarget.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className=" md:hidden">
      <h3 className=" text-[16px] font-bold pl-2">Popular Brand with us</h3>
      <ul
        className="  flex w-11/12 m-auto px-1 gap-2 cursor-pointer justify-center flex-nowrap whitespace-nowrap scroll-bar overflow-x-auto  "
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {BrandName.map((pro) => (
          <li className=" hover:font-bold cursor-pointer" key={pro.id}>
            <Link to={`/products/brand/${pro.name}`}> {pro.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Brand() {
  return (
    <div>
      <ul className=" pl-3">
        {BrandName.map((pro) => (
          <li className=" hover:font-bold cursor-pointer" key={pro.id}>
            <Link to={`/products/brand/${pro.name}`}> {pro.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { BrandInline };
export default Brand;
