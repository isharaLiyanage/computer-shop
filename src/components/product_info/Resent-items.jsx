import React, { useEffect, useState } from "react";
import { publicSend } from "../../Axios";
import Item_cart from "../Item_cart";

function Recent_items() {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [product, setProduct] = useState(null);

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

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await publicSend.get("/api/products/all?new=true");
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h3 className=" font-bold text-[25px] m-4">Recent Items</h3>
      <div
        className="flex overflow-x-auto scroll-bar gap-2 "
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {Array.isArray(product) ? (
          product.map((item) => <Item_cart item={item} key={item._id} />)
        ) : (
          <p>Loading.....</p>
        )}
      </div>
    </div>
  );
}

export default Recent_items;
