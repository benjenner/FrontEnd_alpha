import React from "react";
import Logotype from "../partials/sections/Logotype";

const SignIn = () => {
  return (
    <div>
      <div className="form-container">
        <form className="form-auth">
          <h2>Login</h2>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email address"
            ></input>
          </div>
          <div className="input-field">
            <label htmlFor="email">Password</label>
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Enter your password"
            ></input>
          </div>

          <div className="submit-button">
            <button className="submitBtnLogin" type="submit">
              Log In
            </button>
          </div>
          <div className="redirect-field">
            <label>
              Don't have an account?<a href=""> Sign Up</a>{" "}
            </label>
          </div>
        </form>
      </div>
      <div className="logotype-container">
        <Logotype></Logotype>
      </div>
    </div>
  );
};

export default SignIn;
