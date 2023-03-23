import React, { useState } from "react";
import Item_cart from "../Item_cart";
import Recent_items from "../product_info/Resent-items";

function Collection() {
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
    <div>
      <h3 className=" text-center">Collection</h3>
      <div
        className="flex overflow-x-auto scroll-bar gap-2 "
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <Recent_items />
      </div>
    </div>
  );
}

export default Collection;
