import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserSend } from "../../Axios";

function Orders() {
  const [orders, setOrders] = useState();
  const [ordersTitle, setOrdersTitle] = useState([]);
  const [change, setChange] = useState();

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
  const handelConform = ({ id }) => {
    console.log(id);
    async function fetchData() {
      try {
        const res = await UserSend.put(`/api/orders/${id}`, {
          status: "conform",
        });
        setChange(res);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  };
  console.log(orders);
  return (
    <div className=" pt-8 m-auto bg-[#DFDFDF]   h-screen">
      {orders ? (
        <table className=" m-auto customers">
          <thead>
            <tr>
              <th>product Id</th>
              <th>title</th>

              <th>Quantity</th>
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
                      <p key={item.productId}>{item.productId} </p>
                    </div>
                  ))}
                </td>
                <td>
                  {product.product.map((item) => (
                    <div>
                      <p className=" text-center" key={item.productId}>
                        <strong>{item.productTitle}</strong>
                      </p>
                    </div>
                  ))}
                </td>
                <td>
                  {product.product.map((item) => (
                    <div>
                      <p className=" text-center" key={item.productId}>
                        <strong>{item.quantity}</strong>
                      </p>
                    </div>
                  ))}
                </td>

                <td>${product.amount}</td>

                <td>
                  <button
                    className={
                      product.status === "conform"
                        ? " px-2 bg-green-600  mr-1 text-green-600 "
                        : " px-2 bg-green-600 mr-1 text-white"
                    }
                    // className=" px-2 bg-green-600 mr-1 text-white"
                    // onClick={handelConform({ id: product._id })}
                    onClick={() => handelConform({ id: product._id })}
                  >
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
