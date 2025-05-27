import React, { useState,useContext } from "react";
import classes from "./Signup.module.css";
import { Link } from "react-router-dom";
import { type } from "../../Utilities/action.type";
import { auth } from "../../Utilities/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{user},dispatch]=useContext(DataContext)
  console.log(user)
  const authHandler = async(e) => {
    e.preventDefault();
    if (e.target.name === "signin") {
      // firebase auth
      signInWithEmailAndPassword(auth, email, password).then((userInfo)=>{
        
        dispatch({
          type: type.SET_USER,
          user: userInfo.user
        })
      }).catch((err)=>{
        console.log(err)
      })
    } else {
      createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{
        
         dispatch({
           type: type.SET_USER,
           user: userInfo.user,
         });
      }).catch((err)=>{
        console.log(err)
      })
    }
  };
  return (
    <section className={classes.login}>
      {/* Link */}
      <Link>
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG1.png" alt="" />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.login_signin_btn}
          >
            Sign In
          </button>
        </form>
        {/* Agreement */}
        <p>
          By signing-in you agree to the amazon fake clone conditions use &
          sale. Please see our privacy Notice, our Cookies notice and our
          Interest Based Ads Notice
        </p>
        {/* create account button */}
        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.register_button}
        >
          Create your amazon account
        </button>
      </div>
    </section>
  );
}

export default Auth;
