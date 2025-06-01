import React, { useContext, useEffect,useState } from "react";
import Layout from "../../Components/Layout/Layout";
import { db } from "../../Utilities/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./Orders.module.css";
import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders]=useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).collection("orders").orderBy("created","desc").onSnapshot((snapshot)=>{
        console.log(snapshot)
        setOrders(snapshot.docs.map((doc)=>({
          id:doc.id,
          Data:doc.data(),
        })))
      })
      console.log(orders)
    } else {
    }
  }, []);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Orders</h2>
          {
            orders?.length == 0 && <div style={{padding:"20px"}}>
              You don't have orders yet
            </div>
          }
          <div>{/* order items */}
            {
              orders?.map((eachorder,i)=>{
                return (
                  <div key={i}>
                    <hr />
                    <p>order Id: {eachorder.id}</p>
                    {
                      eachorder?.Data?.basket?.map((order)=>{
                        return (
                          <ProductCard flex={true} product={order} key={order.id}/>
                        )
                      })
                    }
                  </div>
                )

              })
            }
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Orders;
