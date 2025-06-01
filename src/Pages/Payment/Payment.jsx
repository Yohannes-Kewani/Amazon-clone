import React from "react";
import Layout from "../../Components/Layout/Layout";
import { type } from "../../Utilities/action.type";
import classes from "./Payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { useContext, useState } from "react";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../API/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utilities/firebase";
import { useNavigate } from "react-router-dom";
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  console.log(user);
  const totalItem = basket.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [cardError, setCardError] = useState(null);
  const [process, setProcess] = useState(false);
  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);
  const handlePayment = async (e) => {
    e.preventDefault();
    //1 backend_contact to the client secret

    try {
      setProcess(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total * 100}`,
      });

      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      //2 client side react confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,

        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );
      // 3 After confirmation order, store in firebase database and clear baske
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent?.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      // emptying the basket
      dispatch({ type: type.EMPITY_BASKET });

      navigate("/orders", { state: { msg: "You have placed new order" } });
      setProcess(false);
    } catch (error) {
      console.error("Payment error:", error); // helpful for debugging
      setProcess(false);
    }
  };
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
              <form onSubmit={handlePayment}>
                {/* Error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* cardElement */}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span>
                      Total order <CurrencyFormat amount={total} />{" "}
                    </span>
                  </div>
                  <button type="submit">
                    {process ? (
                      <div className={classes.Loader}>
                        <ClipLoader color="gray" size={15} />
                        <p>Please wait ...</p>
                      </div>
                    ) : (
                      "Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
