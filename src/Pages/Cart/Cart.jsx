import React, { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import {Link} from 'react-router-dom'
import classes from './Cart.module.css'
import { type } from "../../Utilities/action.type";

import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";




function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
const total =basket.reduce((amount,item)=>{
  return item.price * item.amount + amount},0)
  const increment =(item)=>{
    dispatch({type: type.ADD_TO_BASKET,item})
  }
  const decrement =(id)=>{
    dispatch({type: type.REMOVE_FROM_BASKET,id})
  }
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
              <section className={classes.cart_product}>
                <ProductCard
                  key={i}
                  product={item}
                  renderDesc={true}
                  flex={true}
                  renderAdd={false}
                />
                <div className={classes.button_container}>
                  <button
                    className={classes.btn}
                    onClick={() => {
                      increment(item);
                    }}
                  >
                    <BiSolidUpArrow />
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => {
                      decrement(item.id);
                    }}
                  >
                    <BiSolidDownArrow />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        {basket?.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p>The subtotal for the {basket?.length} items is:</p>
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
