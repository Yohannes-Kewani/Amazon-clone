import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css';
function Product() {
   const [Products, setProducts] = useState([])
   useEffect(() => {
     axios.get('https://fakestoreapi.com/products').then((res)=>{
        setProducts(res.data)
     }).catch((error)=>{
        console.log(error)
     })
   }, [])
   
  return (
    <section className={classes.products_container}>
        {
        Products.map((singleProduct)=>{
           return <ProductCard product={singleProduct} key={singleProduct.Id}
          />
})
        }
    </section>
  )
}

export default Product