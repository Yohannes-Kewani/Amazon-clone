import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Pages/auth/Auth";
import Landing from "./Pages/Landing/Landing";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Product from "./Components/Product/Product";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
function Routing() {
  const stripePromise = loadStripe(
    "pk_test_51RTitVHgq9rEY86ZfEOpBWLyfR1UvIRq8TPMXCOov6tOKNeUVIqyTGjcELPer0fiYJnCZBOR9V7eWJyRG32y2GxG00M515kVbE"
  );
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute msg={"You must log in to pay"} redirect={"/payment"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute msg={"You must log in to see your orders"} redirect={"/orders"}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:ProductId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
