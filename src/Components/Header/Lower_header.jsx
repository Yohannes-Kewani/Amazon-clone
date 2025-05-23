import React from "react";
import classes from "./Header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
function Lower_header() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <AiOutlineMenu />
          <p>All</p>
        </li>
        <li>Today's deals</li>
        <li>Customer service</li>
        <li>Registry</li>
        <li>Gift cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default Lower_header;
