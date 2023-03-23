import React from "react";

import Product_details from "../components/product_info/Product_details";
import Recent_items from "../components/product_info/Resent-items";

function Product_info() {
  return (
    <div>
      <Product_details />
      <Recent_items />
    </div>
  );
}

export default Product_info;
