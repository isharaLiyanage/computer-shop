import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { publicSend, UserSend } from "../../Axios";
import "./Admin.css";
function AllProducts() {
  const [products, setProducts] = useState();
  const [deleteProduct, setDeleteProducts] = useState("1");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await UserSend.get("/api/products/all");

        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [deleteProduct]);
  const handelDelete = async (props) => {
    try {
      const res = await UserSend.delete(`/api/products/delete/${props}`);
      setDeleteProducts(deleteProduct + 1);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(products);
  return (
    <div>
      {products ? (
        <table className=" customers">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    className=" w-12"
                    src={product.img[0]}
                    alt={product.title}
                  />
                </td>
                <td>{product.title}</td>
                <td>${product.price}</td>

                <td>
                  <button className=" px-2 bg-green-600 mr-1 text-white">
                    Edit
                  </button>
                  <button
                    onClick={() => handelDelete(product._id)}
                    className=" px-2 bg-red-700 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default AllProducts;
