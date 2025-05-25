import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useParams } from "react-router-dom";
import { ProductUrl } from "../../API/endpoints";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Results.module.css";
import Loader from "../../Components/Loader/Loader";
function Results() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  const [isLoading,setisLoading]=useState(false);
  useEffect(() => {
    
    setisLoading(true)
      axios.get(`${ProductUrl}/products/category/${categoryName}`).then((res) => {setResults(res.data) 
      setisLoading(false)}).catch((err) => {
        console.log(err);
        setisLoading(false)
      });
  }, []);
  return (
    <Layout>
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <section>
            <h1 style={{ padding: "30px" }}>Results</h1>
            <p style={{ padding: "30px" }}>Category/{categoryName}</p>
            <hr />
            <div className={classes.products_container}>
              {results?.map((product) => (
                <ProductCard key={product.id} product={product} renderAdd={true} />
              ))}
            </div>
          </section>
        )}
      </>
    </Layout>
  );
}

export default Results;
