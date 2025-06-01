import React, { useState, useContext} from "react";
import classes from "./Signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { type } from "../../Utilities/action.type";
import { auth } from "../../Utilities/firebase";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData)
  const [loader, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  console.log(user);
  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "signin") {
      // firebase auth
      setLoading({ ...loader, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: type.SET_USER,
            user: userInfo.user,
          
          });
          setLoading({ ...loader, signIn: false });
          navigate(navStateData?.state?.redirect || "/")
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loader, signIn: false });
        });
    } else {
      setLoading({ ...loader, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loader, signUp: false });
           navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loader, signUp: false });
        });
    }
  };
  // src/utils/firebaseErrors.js

  const getFriendlyError = (message) => {
    if (!message) return "";

    if (message.includes("auth/invalid-email")) {
      return "Please enter a valid email address.";
    }
    if (message.includes("auth/missing-password")) {
      return "Please enter your password.";
    }
    if (message.includes("auth/invalid-credential")) {
      return "Incorrect email or password.";
    }
    if (message.includes("auth/email-already-in-use")) {
      return "This email is already registered.";
    }

    return "Something went wrong. Please try again.";
  };

  return (
    <section className={classes.login}>
      {/* Link */}
      <Link to="/">
        <img src="https://pngimg.com/uploads/amazon/amazon_PNG1.png" alt="" />
      </Link>
      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <small style={{padding: "5px",
          textAlign: "center",
          color: "red",
          fontWeight: "bold"
        }}>{navStateData?.state?.msg}</small>
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
            {loader.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
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
          {loader.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your amazon account"
          )}
        </button>
        {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>
            {getFriendlyError(error)}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
