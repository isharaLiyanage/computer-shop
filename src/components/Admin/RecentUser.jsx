import React from "react";
import "./Admin.css";

function RecentUser({ users }) {
  return (
    <div>
      <h2>Recent User</h2>
      <div className="w p-5">
        <table className="customers">
          <tbody>
            <tr>
              <th></th>
              <th className="">Name</th>
              <th className="">From</th>
              <th className="">Date & Time</th>
              <th className="">Action</th>
            </tr>
            {users ? (
              users.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      className=" w-12 mx-14 rounded-full"
                      src={item.img}
                      alt=""
                    />
                  </td>
                  <td>{item.username}</td>

                  <td>
                    {item.address?.State},{item.address?.Country}
                  </td>
                  <td>{item.updatedAt}</td>
                  <td>
                    <button className=" px-2 bg-red-700 text-white">
                      Block
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th>
                  <p>Loading....</p>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentUser;
