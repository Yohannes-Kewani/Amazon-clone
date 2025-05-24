import React from 'react'
import Layout from '../../Components/Layout/Layout';
import Carousel from "../../Components/Carousel/CarouselEffect.jsx";

import Category from '../../Components/Category/Category.jsx';

import Product from '../../Components/Product/Product.jsx';

function Landing() {
  return (
    <Layout>
      <Carousel />
      <Category />
      <Product />
    </Layout>
  );
}

export default Landing