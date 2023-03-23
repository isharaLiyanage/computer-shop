import React, { useState } from "react";
import { AddProducts } from "../../Redux/ApiCall";
import { useDispatch } from "react-redux";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
function AddProduct() {
  const [images, setImages] = useState([]);
  const [imagesShow, setImagesShow] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [Name, SetName] = useState("");
  const [category, SetCategory] = useState("Pc Computer");
  const [subcategory, SetSubcategory] = useState("");
  const [brandName, SetBrandName] = useState("Intel");
  const [keywords, SetKeywords] = useState("");
  const [value, setValue] = useState(1);
  const [option, SetOption] = useState("Color");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState(true);
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const handleIncrement = () => {
    setValue(value + 1);
    setImages([...images, null]); // add null image for the new box
  };
  const handleDecrement = () => {
    setValue(value > 1 ? value - 1 : 1);
    setImages(images.slice(0, -1)); // remove last image for the deleted box
  };

  const handleImageChange = (event, index) => {
    const file = event.target.files[0];
    const url = file;
    const newImages = [...images];

    newImages[index] = url;
    setImages(newImages);
    const ShowImage = URL.createObjectURL(file);
    const ShowNewImages = [...images];
    ShowNewImages[index] = ShowImage;

    setImagesShow(ShowNewImages);
  };

  const keyword = keywords.split(","); // Split input value into an array of keywords

  const inputs = {
    title: Name,
    desc: desc,
    category: category,
    subcategory: subcategory,
    brandName: brandName,
    size: "",
    color: "",
    price: price,
    inStock: inStock,
  };

  const Category = [
    { Name: "Pc Computer", id: "1" },
    { Name: "Graphics Card", id: "2" },
    { Name: "Processors", id: "3" },
    { Name: "Memory & RAM", id: "4" },
    { Name: "Motherboards", id: "5" },
    { Name: "Headphones", id: "6" },
    { Name: "Keyboard & Mouse", id: "7" },
    { Name: "Speakers & Sound Systems", id: "8" },
    { Name: "Cables & Adapters", id: "9" },
    { Name: "Networking Devices", id: "10" },
    { Name: "Laptops", id: "10" },
  ];
  const BrandName = [
    { name: "Intel", id: "1" },
    { name: "Samsung", id: "2" },
    { name: "Logitech", id: "3" },
    { name: "JBL", id: "4" },
    { name: "Sennheiser", id: "5" },
    { name: "Corsair", id: "6" },
    { name: "Bose", id: "7" },
    { name: "Razer", id: "8" },
    { name: "SteelSeries", id: "9" },
    { name: "Harman", id: "10" },
    { name: "Kardon", id: "11" },
  ];

  const handelSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const keyword = keywords.split(",");
    const imageUrl = [];
    const promises = images.map((image) => {
      const fileName = new Date().getTime() + image;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
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
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              imageUrl.push(downloadURL);

              resolve(downloadURL);
              setUploading(false);
            });
          }
        );
      });
    });

    // Wait for all promises to resolve
    Promise.all(promises)
      .then(() => {
        const product = {
          ...inputs,
          img: imageUrl,
          keywords: keyword,
        };

        if (imageUrl.length > 0) {
          AddProducts(product, dispatch);
        }
        setSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className=" p-8 bg-[#DFDFDF]   h-screen ">
      <form onSubmit={handelSubmit}>
        <div className="flex justify-between w-80 py-1">
          <p>Name :</p>{" "}
          <input
            onChange={(e) => {
              SetName(e.target.value);
            }}
            required
            className=" w-36 bg-white"
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="flex justify-between w-80 py-1">
          <p>Category :</p>{" "}
          <select
            onChange={(e) => {
              SetCategory(e.target.value);
            }}
            className=" w-36 bg-white"
            type="text"
            name=""
            id=""
            value={Category[0].value}
          >
            {Category.map((cat) => (
              <option value={cat.Name} key={cat.id}>
                {cat.Name}
              </option>
            ))}
          </select>
        </div>{" "}
        <div className="flex justify-between w-80 py-1">
          <p>Sub Category :</p>{" "}
          <input
            onChange={(e) => {
              SetSubcategory(e.target.value);
            }}
            className=" w-36 bg-white"
            required
            type="text"
            name=""
            id=""
          />
        </div>
        <div className="flex justify-between w-80 py-1">
          <p>Brand Name :</p>{" "}
          <select
            onChange={(e) => {
              SetBrandName(e.target.value);
            }}
            className=" w-36 bg-white"
            type="text"
            name=""
            id=""
            value={brandName[0]}
          >
            {BrandName.map((brand) => (
              <option value={brand.name} key={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>{" "}
        <div className="flex justify-between w-80 py-1">
          <p>Keywords :</p>
          <input
            className=" w-36 bg-white"
            placeholder="please Use , for separate keywords "
            type="text"
            name="keywords"
            id=""
            onChange={(e) => {
              SetKeywords(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-between w-64">
          <p>Number of products :</p>
          <div className=" w-20">
            <button onClick={handleDecrement}>-</button>
            <input
              className=" w-7 text-center"
              type="text"
              value={value || ""}
            />
            <button onClick={handleIncrement}>+</button>
          </div>
        </div>
        <div className="flex justify-between w-64">
          <p>Select option type :</p>
          <select
            name="CorS"
            id=""
            className=" w-20"
            defaultValue="color"
            onChange={(e) => {
              SetOption(e.target.value);
            }}
          >
            <option value="color" selected>
              Color
            </option>{" "}
            <option value="size">Size</option>
          </select>
        </div>
        <div className="flex flex-wrap">
          {Array.from(Array(value), (_, index) => (
            <div className="" key={index}>
              <div className="bg-white rounded-lg relative  flex items-center justify-center mr-4">
                {uploading ? (
                  <div className=" absolute z-10 w-32 h-32 top-0 right-0 left-0 flex justify-center items-center bg-black text-white animate-pulse">
                    Uploading...
                  </div>
                ) : (
                  ""
                )}
              </div>
              <img
                src={imagesShow[index] || "https://via.placeholder.com/150"}
                className=" w-32 h-32 object-contain"
                alt=""
              />

              <input
                type="file"
                name=""
                id=""
                required
                onChange={(event) => handleImageChange(event, index)}
              />

              <div className="flex justify-between w-80 py-1">
                <input
                  className=" w-36 bg-white"
                  type="text"
                  placeholder={option}
                  name=""
                  id=""
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between w-80 py-1">
          <p>Price :</p>{" "}
          <div className="flex">
            <p>$ </p>{" "}
            <input
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              className=" w-36 bg-white"
              type="Number"
              name=""
              id=""
            />
          </div>
        </div>
        <div className="flex justify-between w-80 py-1">
          <p>InStock :</p>{" "}
          <div className="flex">
            <select
              name="inStock"
              id=""
              defaultValue={inStock}
              onChange={(e) => {
                setInStock(e.target.value);
              }}
            >
              {" "}
              <option value="true" selected>
                True
              </option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between w-80 py-1">
          <p>Description </p>{" "}
          <div className="flex">
            <textarea
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              name="desc"
              className=" bg-white"
              id=""
              cols="25"
              rows="10"
            ></textarea>
          </div>
        </div>
        <button type="submit" className=" px-2 bg-white text-black ">
          {uploading ? "Uploading...." : "Add Product"}
        </button>
        {success ? <h3>Product added successfully</h3> : ""}
      </form>
    </div>
  );
}

export default AddProduct;
