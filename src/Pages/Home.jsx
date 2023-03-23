import React from "react";
import Category from "../components/Home/Category";
import Collection from "../components/Home/Collection";
import Slider from "../components/Home/Slider";
import CategoryName from "../components/Home/CategoryName";

function Home() {
  return (
    <div>
      <CategoryName />
      <Slider />
      <Category />
      <Collection />
    </div>
  );
}

export default Home;
