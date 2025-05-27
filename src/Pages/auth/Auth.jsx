import React from 'react'
import classes from './Signup.module.css'
import {Link} from "react-router-dom"
function Auth() {
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
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <button className={classes.login_signin_btn}>Sign In</button>
        </form>
        {/* Agreement */}
        <p>
          By signing-in you agree to the amazon fake clone conditions use &
          sale. Please see our privacy Notice, our Cookies notice and our
          Interest Based Ads Notice
        </p>
        {/* create account button */}
        <button className={classes.register_button}>Create your amazon account</button>
      </div>
    </section>
  );
}

export default Auth