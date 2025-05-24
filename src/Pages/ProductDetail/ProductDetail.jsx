import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ProductUrl } from "../../API/endpoints";
import ProductCard from "../../Components/Product/ProductCard";

function ProductDetail() {
  const { ProductId } = useParams();
  const [product, setproduct] = useState({});
  useEffect(() => {
    axios
      .get(`${ProductUrl}/products/${ProductId}`)
      .then((res) => {
        setproduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      }, []);
  });

  return (
    <Layout>
      <ProductCard key={product.id} product={product} />
    </Layout>
  );
}

export default ProductDetail;
