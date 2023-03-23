import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserSend } from "../../Axios";

function Orders() {
  const [orders, setOrders] = useState();
  const userId = useSelector((state) => state.User?.Auth._id);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await UserSend.get(`/api/orders/`);

        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className=" pt-8 m-auto bg-[#DFDFDF]   h-screen">
      {orders ? (
        <table className=" m-auto customers">
          <thead>
            <tr>
              <th>product Id</th>
              <th>Title</th>
              <th>Price</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((product) => (
              <tr key={product._id}>
                <td>
                  {product.product.map((item) => (
                    <div>
                      <p key={item.productId}>{item.productId}</p>
                    </div>
                  ))}
                </td>
                <td>{product.title}</td>
                <td>${product.amount}</td>

                <td>
                  <button className=" px-2 bg-green-600 mr-1 text-white">
                    Conform
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

export default Orders;
