import React from "react";
import Header from "./Components/Header/Header.jsx";
import "./App.css";
import Carousel from "./Components/Carousel/CarouselEffect.jsx";
import Category from "./Components/Catagory/Category.jsx";
import Product from "./Components/Product/Product.jsx";
import "./index.css";
function App() {
  return (
    <>
      <Header />
      <Carousel />
      <Category />
      <Product />
    </>
  );
}

export default App;
