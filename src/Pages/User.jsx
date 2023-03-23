import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import img from "../assets/img/pc.png";
import { UserSend } from "../Axios";
import app from "../firebase";
import { UpdateUser } from "../Redux/ApiCall";
import { Logout } from "../Redux/AuthSlice";
function User() {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const userDetails = useSelector((state) => state.User.Auth);
  const id = useSelector((state) => state.User.Auth._id);
  const [orders, setOrders] = useState();

  const dispatch = useDispatch();
  const put_Name = useRef();
  const put_fullName = useRef();
  const put_email = useRef();
  const put_number = useRef();
  const put_address01 = useRef();
  const put_address02 = useRef();
  const put_city = useRef();
  const put_state = useRef();
  const put_country = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await UserSend.get(`/api/orders/find/${id}`);

        setOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();
    setUploading(true);

    let name;
    if (put_Name.current.value) {
      name = put_Name.current.value;
    } else {
      name = userDetails.name;
    }

    let fullName;
    if (put_fullName.current.value) {
      fullName = put_fullName.current.value;
    } else {
      fullName = userDetails.fullName;
    }
    let email;
    if (put_email.current.value) {
      email = put_email.current.value;
    } else {
      email = userDetails.email;
    }
    let number;
    if (put_number.current.value) {
      number = put_number.current.value;
    } else {
      number = userDetails.number;
    }
    let line01;
    if (put_address01.current.value) {
      line01 = put_address01.current.value;
    } else {
      line01 = userDetails.line01;
    }
    let line02;
    if (put_address02.current.value) {
      line02 = put_address02.current.value;
    } else {
      line02 = userDetails.line02;
    }
    let city;
    if (put_city.current.value) {
      city = put_city.current.value;
    } else {
      city = userDetails.city;
    }
    let state;
    if (put_state.current.value) {
      state = put_state.current.value;
    } else {
      state = userDetails.state;
    }
    let country;
    if (put_country.current.value) {
      country = put_country.current.value;
    } else {
      country = userDetails.country;
    }
    const putData = {
      name: name,
      fullName: fullName,
      email: email,
      number: number,
      address: {
        lineOne: line01,
        lineTwo: line02,
        city,
        State: state,
        Country: country,
      },
    };

    if (file) {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const updateUser = {
              ...putData,
              img: downloadURL,
            };
            UpdateUser(updateUser, id, dispatch);
          });
        }
      );
    } else {
      const updateUser = {
        ...putData,
      };
      UpdateUser(updateUser, id, dispatch);
    }

    setUploading(false);
    setSuccess(true);
  };
  const handelLogout = (e) => {
    e.preventDefault();
    dispatch(Logout());
  };
  return (
    <div>
      <div className="bg-image h-64">
        <div className=" p-7 flex  justify-between items-end h-64">
          <div className="flex relative  h-28 items-end">
            <div className=" w-28">
              {file || userDetails.img ? (
                <img
                  src={file ? URL.createObjectURL(file) : userDetails.img}
                  alt=""
                  className=" rounded-full w-28 h-28 border-2 border-white"
                />
              ) : (
                <div className="  rounded-full flex justify-center items-center text-6xl  w-28 h-28 absolute  bg-[#ebe7e79d]  top-0 right-0 left-0 ">
                  +
                </div>
              )}

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                id="file"
                className=" z-20 w-28 opacity-0 h-28 absolute  top-0 right-0 left-0 bottom-0"
              />
            </div>

            <p className=" w-12 z-40  text-white text-lg">
              {userDetails.username}
            </p>
          </div>
          <div className="">
            <button className=" px-2 bg-teal-500">Active</button>
          </div>
        </div>
      </div>

      <div className=" pt-8  ">
        {orders ? (
          <table className=" m-auto customers">
            <thead>
              <tr>
                <th>product Id</th>
                <th>Title</th>
                <th>Price</th>

                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((product) => (
                <tr key={product._id}>
                  <td>
                    {product.product.map((item) => (
                      <div key={item.productId}>
                        <Link to={`/products/${item.productId}`}>
                          {" "}
                          <p className=" font-bold" key={item.productId}>
                            {item.productId}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </td>
                  <td> {product.title}</td>
                  <td>${product.amount}</td>

                  <td>
                    <p className=" px-2 animate-pulse bg-green-600 mr-1 text-white">
                      {product.status}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      <form
        onSubmit={handelSubmit}
        className=" flex flex-wrap py-16 justify-between px-1 sm:px-5"
      >
        <div className=" px-3">
          <div className="flex justify-between">
            <label htmlFor="username">User Name :</label>
            <input
              type="text"
              disabled
              name="username"
              ref={put_Name}
              className=" w-44 sm:w-56 border-2 border-gray-900"
              defaultValue={userDetails.username}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="fullName">Full Name :</label>
            <input
              type="text"
              ref={put_fullName}
              name="fullName"
              defaultValue={userDetails.fullName}
              className=" w-44 sm:w-56 border-2 border-gray-900"
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              ref={put_email}
              name="email"
              className=" w-44 sm:w-56 border-2 border-gray-900"
              defaultValue={userDetails.email}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="number">Mobile Number :</label>
            <input
              type="number"
              name="number"
              ref={put_number}
              className=" w-44 sm:w-56 border-2 border-gray-900"
              defaultValue={userDetails.number}
            />
          </div>
        </div>
        <div className="px-3">
          <h3 className=" font-bold text-lg">Address</h3>
          <div className="flex justify-between">
            <label htmlFor="line01">Line 01 :</label>
            <input
              type="text"
              ref={put_address01}
              name="line01"
              defaultValue={userDetails.address?.lineOne}
              className=" w-44 sm:w-56 border-2 border-gray-900"
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="line02">Line 02 :</label>
            <input
              type="text"
              ref={put_address02}
              name="line02"
              defaultValue={userDetails.address?.lineTwo}
              className=" w-44 sm:w-56 border-2 border-gray-900"
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="city">City :</label>
            <input
              type="text"
              ref={put_city}
              name="city"
              className=" w-44 sm:w-56 border-2 border-gray-900"
              defaultValue={userDetails.address?.City}
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="state">State :</label>
            <input
              type="text"
              ref={put_state}
              name="state"
              defaultValue={userDetails.address?.State}
              className=" w-44 sm:w-56 border-2 border-gray-900"
            />
          </div>
          <div className="flex justify-between">
            <label htmlFor="country">Country :</label>
            <input
              type="text"
              ref={put_country}
              name="country"
              defaultValue={userDetails.address?.Country}
              className=" w-44 sm:w-56 border-2 border-gray-900"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handelLogout}
              type="submit"
              className=" px-6 bg-red-200 rounded-sm mt-16"
            >
              Log Out
            </button>
            <button
              onClick={handelSubmit}
              type="submit"
              className=" px-6 bg-teal-600 rounded-sm mt-16"
            >
              {uploading ? "Uploading...." : "Update"}
            </button>
          </div>
          {success ? (
            <h3 className=" text-center bg-slate-300 text-teal-900 mt-5">
              {" "}
              Successfully Updated.
            </h3>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
}

export default User;
