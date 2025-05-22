import React from "react";
import { IoIosSearch } from "react-icons/io";
import { CiShoppingCart } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import classes from './Header.module.css';

function Header() {
  return (
    <section>
      <section className={classes.header_container}>
        <div className={classes.logo_container}>
          {/* Logo */}
          <a href="">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
            />
          </a>
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
          <IoIosSearch size={25} />
        </div>
        {/* right side link */}
        <div>
          <div className={classes.order_container}>
            <a href="" className={classes.languages}>
              <img
                src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1024px-Flag_of_the_United_States.svg.png
"
                alt=""
              />
              <select>
                <option value="">EN</option>
              </select>
            </a>
            {/* three components */}
            <a href="">
              <div>
                <p>sign in</p>
                <span>Account & lists</span>
              </div>
            </a>
            {/* orders */}
            <a href="">
              <p>Returns</p>
              <span>& orders</span>
            </a>
            {/* cart */}
            <a href="" className={classes.cart}>
              <CiShoppingCart size={32} />
              {/* icon */}
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Header;

