import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicSend } from "../../Axios";

import { useDispatch, useSelector } from "react-redux";
import { AddCart } from "../../Redux/ApiCall";

function Product_details() {
  const [currentImage, setCurrentImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = useSelector((state) => state.User.Auth._id);

  const id = location.pathname.split("/")[2];
  const handleImageClick = (image) => {
    setCurrentImage(image);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await publicSend.get(`/api/products/find/${id}`);

        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [id]);

  const handleClick = () => {
    const productId = product._id;
    const itemTitle = product.title;
    const itemImg = product.img[0];
    const itemQuantity = quantity;
    const price = product.price;
    const itemPrice = price;
    const products = { productId, itemTitle, itemImg, itemPrice, itemQuantity };

    AddCart(userId, quantity, productId, products, price, dispatch);
  };
  return (
    <div className=" pt-5">
      {product ? (
        <div className="flex flex-wrap justify-around  items-center">
          <div className="w-8/12 sm:w-5/12 relative">
            <img
              className=" h-[400px] border-2 border-[#1a0505dd] m-auto object-contain"
              src={currentImage || product.img[0]}
              alt="Product"
            />
            <div className=" pt-2 flex items-center justify-center">
              {product.img.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="h-20 w-20   mx-2 border border-gray-400 hover:border-gray-600 cursor-pointer"
                  onClick={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>
          <div className="w-8/12  sm:w-4/12">
            <div className=" pt-[65px]">
              <h1 className=" font-bold py-2 text-[20px]">
                Name: {product.title}
              </h1>
              <h3>Category : {product.category}</h3>
              <p>{product.desc}</p>
              <div className="flex mt-7">
                <div className="flex">
                  <div className="d"></div>
                </div>
                <h3 className="font-bold ">${product.price}</h3>
              </div>
              <div className="flex my-3 justify-between">
                <div className="flex">
                  <div className="flex">
                    <button
                      onClick={() => {
                        setQuantity(quantity > 1 ? quantity - 1 : 1);
                      }}
                    >
                      -
                    </button>
                    <input
                      className=" w-5 border-2 mx-5 border-[#dddd]"
                      type="text"
                      name="quantity"
                      value={quantity}
                      id="quantity"
                    />
                    <button
                      onClick={() => {
                        setQuantity(quantity + 1);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className=" rounded-md border-2 px-3 bg-none py-1"
                  onClick={handleClick}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className="w-5/12 sm:w-2/12">
            <ul className=" py-7 border-2 border-[#dddd]">
              <li>
                Model Number - <br />
                ... {product._id.slice(15, 35)}
              </li>
              <li>
                SKU - <br /> JBLHPT510BTBLUEU
              </li>
              <li>
                Warranty Period - <br /> 12 Month
              </li>
              <li>
                Standard Delivery- <br /> 4 - 5 Working Days
              </li>
              <li>
                Delivery Area - <br /> Island wide
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading....</p>
      )}
    </div>
  );
}

export default Product_details;
