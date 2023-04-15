import React, { useEffect, useState } from "react";
import { UserSend } from "../../Axios";
import RecentUser from "./RecentUser";

function Dashboard({ Users }) {
  const [usersCount, setUsersCount] = useState();
  const [productsCount, setProductsCount] = useState();
  const [orderCount, setOrderCount] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const UserRes = await UserSend.get("/api/users/stats");
        const ProductsRes = await UserSend.get("/api/products/stats");
        const OrderRes = await UserSend.get("/api/orders/stats");

        setUsersCount(UserRes.data);
        setProductsCount(ProductsRes.data);
        setOrderCount(OrderRes.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className=" p-8 bg-[#DFDFDF]   h-screen ">
      <div className="flex justify-between">
        <div className=" w-3/12 h-24 flex justify-center items-center bg-white rounded-md">
          <div className=" text-center">
            <p>{usersCount}</p>
            <h3>Total Users</h3>
          </div>
        </div>

        <div className=" w-3/12 h-24 flex justify-center items-center bg-white rounded-md">
          <div className=" text-center">
            <p>{productsCount}</p>
            <h3>Total Products</h3>
          </div>
        </div>
        <div className=" w-3/12 h-24 flex justify-center items-center bg-white rounded-md">
          <div className=" text-center">
            <p>{orderCount}</p>
            <h3>Total Orders</h3>
          </div>
        </div>
      </div>

      <div className=" pt-6">
        <RecentUser users={Users} />
      </div>
    </div>
  );
}

export default Dashboard;
