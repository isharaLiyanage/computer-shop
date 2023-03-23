import React, { useEffect, useState } from "react";
import { Await, useLocation } from "react-router-dom";

import { Link } from "react-router-dom";

import Products from "../components/Product/Products";
import { publicSend } from "../Axios";
import Brand, { BrandInline } from "../components/Home/Brand";

function Product() {
  const [products, setProducts] = useState({});
  const location = useLocation();
  const Tag = decodeURI(location.pathname.split("/")[2]);
  const Name = decodeURI(location.pathname.split("/")[3]);

  useEffect(() => {
    async function fetchData() {
      try {
        let res;
        if (Tag === "cat") {
          res = await publicSend.get(`/api/products/all?cat=${Name}`);
        } else if (Tag === "brand") {
          res = await publicSend.get(`/api/products/brand?brand=${Name}`);
        } else {
          res = await publicSend.get("/api/products/all");
        }
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [Name]);

  return (
    <div>
      <BrandInline />
      <div className="flex">
        <div className=" hidden sm:block w-1/6">
          <h3 className=" text-[16px] font-bold pl-2">Popular Brand with us</h3>
          <Brand />
        </div>
        <div className="w-5/6">
          <h1 className="   py-2">
            <Link to="/" className="font-bold text-[20px]">
              NextroniX {">"}
            </Link>
            {Tag ? Name : ""}
          </h1>
          <Products data={products} />
        </div>
      </div>
    </div>
  );
}

export default Product;
