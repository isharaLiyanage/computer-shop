import React, { useState } from "react";
import { Link } from "react-router-dom";
function CategoryName() {
  const Category = [
    { Name: "CPUs & Processors", id: "1" },
    { Name: "Graphics Card", id: "2" },
    { Name: "CPUs & Processors", id: "3" },
    { Name: " Memory & RAM", id: "4" },
    { Name: "Motherboards", id: "5" },
    { Name: "Headphones", id: "6" },
    { Name: "Keyboards", id: "7" },
    { Name: " Speakers & Sound Systems", id: "8" },
    { Name: "Cables & Adapters", id: "9" },
    { Name: "Networking Devices", id: "10" },
  ];

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
    <div className="  w-full ">
      <ul
        className="flex py-1 sm:py-2  cursor-pointer flex-nowrap whitespace-nowrap scroll-bar overflow-x-auto  "
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {Category.map((item) => (
          <li className=" px-2 hover:font-bold" key={item.id}>
            <Link to={`/products/cat/${item.Name}`}>{item.Name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryName;
