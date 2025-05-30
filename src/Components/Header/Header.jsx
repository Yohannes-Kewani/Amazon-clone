import React, { useContext } from "react";
import Lower_header from "./Lower_header";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import classes from "./Header.module.css";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from "../../Utilities/firebase"

function Header() {
  const [{user, basket}, dispatch]=useContext(DataContext)
  const totalItem=basket.reduce((amount, item)=>{
    return item.amount+amount
  },0)
  return (
    <section className={classes.fixed}>
      <section className={classes.header_container}>
        <div className={classes.logo_container}>
          {/* Logo */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
            />
          </Link>
          {/* Delivery */}
          <div className={classes.delivery}>
            <span>
              {/* icon */}
              <CiLocationOn />
            </span>
            <div>
              <p>Delivered to:</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        <div className={classes.search}>
          {/* Search */}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="search product" />
          {/* icon */}
          <IoIosSearch size={38} />
        </div>
        {/* right side link */}
        <div>
          <div className={classes.order_container}>
            <Link to="" className={classes.languages}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png
"
                alt=""
              />
              <select>
                <option value="">EN</option>
              </select>
            </Link>
            {/* three components */}
            <Link to={!user && "/auth"}>
             
                <div>
                  {user ? (
                    <>
                      <p>hello, {user?.email.split("@")[0]}</p>
                      <span onClick={()=>auth.signOut()}>Sign out</span>
                    </>
                  ) : (
                    <>
                      <p>sign in</p>
                      <span>Account & lists</span>
                    </>
                  )}
                </div>
             
            </Link>
            {/* orders */}
            <Link to="/orders">
              <p>Returns</p>
              <span>& orders</span>
            </Link>
            {/* cart */}
            <Link to="/cart" className={classes.cart}>
              <CiShoppingCart size={32} />
              {/* icon */}
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <Lower_header />
    </section>
  );
}

export default Header;
