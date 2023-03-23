import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { publicSend } from "../Axios";

function Search({ value }) {
  const [search, setSearch] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await publicSend.get(`/api/products/?q=${value}`);

        setSearch(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [value]);

  return (
    <div>
      {" "}
      <table className=" bg-[#cecccc8a] text-black p-5 w-full">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Category</th>
          </tr>

          {search ? (
            search.map((item) => (
              <tr className=" text-slate-700" key={item._id}>
                <th>
                  {" "}
                  <Link to={`/products/${item._id}`}>{item.title}</Link>
                </th>
                <th>
                  {" "}
                  <Link to={`/products/${item._id}`}>{item.category}</Link>
                </th>
              </tr>
            ))
          ) : (
            <tr>
              <th>"Nothing..."</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
