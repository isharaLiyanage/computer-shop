import React, { useEffect, useState } from "react";
import AddProduct from "../../components/Admin/AddProduct";
import Dashboard from "../../components/Admin/Dashboard";
import UserDetails from "../../components/Admin/UserDetails";
import Orders from "../../components/Admin/Orders";
import AllProducts from "../../components/Admin/AllProducts";
import { publicSend, UserSend } from "../../Axios";

function Admin() {
  const [selectedNavItem, setSelectedNavItem] = useState("dashboard");
  const [lastUsers, setLastUsers] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await publicSend.get("/api/users/all?new=true");

        setLastUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const renderSelectedNavItem = () => {
    switch (selectedNavItem) {
      case "dashboard":
        return <Dashboard Users={lastUsers} />;
      case "addProduct":
        return <AddProduct />;
      case "orders":
        return <Orders />;
      case "userDetails":
        return <UserDetails />;
      case "AllProducts":
        return <AllProducts />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex  h-screen shadow-md">
      <div className="w-2/12 pt-4 bg-[#fffd]">
        <div className="flex cursor-pointer  flex-col  h-full">
          <div
            className={
              selectedNavItem === "dashboard" ? "bg-gray-300  font-bold" : ""
            }
          >
            <p
              className="py-2 px-4 hover:bg-gray-300 "
              onClick={() => setSelectedNavItem("dashboard")}
              //   active={(selectedNavItem === "dashboard".toString()).toString()}
            >
              Dashboard
            </p>
          </div>
          <div
            className={
              selectedNavItem === "addProduct" ? "bg-gray-300  font-bold" : ""
            }
          >
            <p
              className="py-2 px-4 hover:bg-gray-300"
              onClick={() => setSelectedNavItem("addProduct")}
            >
              Add Product
            </p>
          </div>
          <div
            className={
              selectedNavItem === "orders" ? "bg-gray-300  font-bold" : ""
            }
          >
            <p
              className="py-2 px-4 hover:bg-gray-300"
              onClick={() => setSelectedNavItem("orders")}
            >
              Orders
            </p>
          </div>
          <div
            className={
              selectedNavItem === "AllProducts" ? "bg-gray-300  font-bold" : ""
            }
          >
            <p
              className="py-2 px-4 hover:bg-gray-300"
              onClick={() => setSelectedNavItem("AllProducts")}
            >
              All Products
            </p>
          </div>
          <div
            className={
              selectedNavItem === "userDetails" ? "bg-gray-300  font-bold" : ""
            }
          >
            <p
              className="py-2 px-4 hover:bg-gray-300"
              onClick={() => setSelectedNavItem("userDetails")}
            >
              User Details
            </p>
          </div>
        </div>
      </div>
      <div className="w-10/12">{renderSelectedNavItem()}</div>
    </div>
  );
}

export default Admin;
