import React from 'react'
import Layout from '../../Components/Layout/Layout'
import classes from "./Payment.module.css"
import { DataContext } from '../../Components/DataProvider/DataProvider'
import { useContext, useState } from 'react'
import ProductCard from '../../Components/Product/ProductCard'
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat'
function Payment() {
  const [{user, basket}]=useContext(DataContext)
  console.log(user)
   const totalItem = basket.reduce((amount, item) => {
     return item.amount + amount;
   }, 0);
   const stripe= useStripe();
   const elements = useElements();
   const [cardError,setCardError]=useState(null)
   const handleChange = (e)=>{
    e?.error?.message?(setCardError(e?.error?.message)):(setCardError(""))
   }
   const total = basket.reduce((amount, item) => {
     return item.price * item.amount + amount;
   }, 0);
  return (
    <Layout>
      {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items.
      </div>

      {/* payment method */}
      <section className={classes.payment}>
        {/* adress */}
        <div className={classes.flex}>
          <h3>Delivery Adress</h3>

          <div>
            <div>{user?.email}</div>
            <div>Sevrege 30 160</div>
            <div>Stocholm, Sweden</div>
          </div>
        </div>

        <hr />
        {/* products */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>

          <div>
            {basket?.map((item) => (
              <ProductCard product={item} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Card Methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form action="">
                {/* Error */}
                {
                  cardError && <small style={{color:"red"}}>{cardError}</small>
                }
                {/* cardElement */}
                <CardElement onChange={handleChange}/>
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span>Total order <CurrencyFormat amount={total}/> </span>
                  </div>
                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment