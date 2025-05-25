import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import {Link} from 'react-router-dom'
import classes from './Cart.module.css'


function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
const total =basket.reduce((amount,item)=>{
  return item.price + amount},0)
  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>

          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No item in your cart</p>
          ) : (
            basket.map((item, i) => (
              <ProductCard
                key={i}
                product={item}
                renderDesc={true}
                flex={true}
                renderAdd={false}
              />
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>The subtotal the {basket?.length} items is:</p>
              <CurrencyFormat amount={total} />
            </div>{" "}
            <span>
              <input type="checkbox" />
              <small>this order contains a gift</small>
            </span>
            <Link to={"/payment"}>Continue to payment</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
