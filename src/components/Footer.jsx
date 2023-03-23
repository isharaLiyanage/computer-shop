import React from "react";
import logo from "../assets/img/logo.png";

function Footer() {
  return (
    <div>
      <footer className=" bg-[#9AE3F3] p-2">
        <div className="sm:flex justify-between align-bottom">
          <div className=" sm:w-2/6">
            <img className=" w-32" src={logo} alt="" />
            <p className=" text-justify">
              At Nextronix, we are committed to providing our customers with
              high-quality products and exceptional customer service. With years
              of experience in computer, we strive to deliver innovative
              solutions that meet the unique needs of our clients. Our mission
              is to exceed expectations and build lasting relationships with our
              customers.
            </p>
          </div>
          <div className="sm:w-1/6">
            <h5 className="pt-5 sm:pt-0">Quick Links</h5>
            <ul>
              <li className=" sm:mt-3">Home </li>
              <li className=" sm:mt-3">Product</li>
              <li className=" sm:mt-3">Brand</li>
              <li className=" sm:mt-3">Gallery</li>

              <li className=" sm:mt-3">About Us</li>
            </ul>
          </div>
          <div className=" w-1/6"></div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
