import React from "react";
import Logotype from "../partials/sections/Logotype";
import { useFormik } from "formik";
import signUpFormValidation from "../utilities/signUpFormValidation";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirm: "",
      checkbox: false,
    },
    validate: signUpFormValidation,
    onSubmit: (values) => {
      // PUT-anrop
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <div className="form-container">
        <form onSubmit={formik.handleSubmit} className="form-auth">
          <h2>Create Account</h2>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            ></input>
            {/* Göra generisk? */}
            {formik.errors.firstName ? (
              <span className="validation-error">
                {formik.errors.firstName}
              </span>
            ) : null}
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            ></input>
            {formik.errors.lastName ? (
              <span className="validation-error">{formik.errors.lastName}</span>
            ) : null}
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              onChange={formik.handleChange}
              value={formik.values.email}
            ></input>
            {formik.errors.email ? (
              <span className="validation-error">{formik.errors.email}</span>
            ) : null}
          </div>
          <div className="input-field">
            <label htmlFor="email">Password</label>
            <input
              id="password"
              name="password"
              type="text"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            ></input>
            {formik.errors.password ? (
              <span className="validation-error">{formik.errors.password}</span>
            ) : null}
          </div>
          <div className="input-field">
            <label htmlFor="email">Confirm Password</label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="text"
              placeholder="Confirm your password"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirm}
            ></input>
            {formik.errors.passwordConfirm ? (
              <span className="validation-error">
                {formik.errors.passwordConfirm}
              </span>
            ) : null}
          </div>
          <div className="checkbox-field">
            <input
              id="checkbox"
              name="checkbox"
              type="checkbox"
              onChange={formik.handleChange}
              value={formik.values.checkbox}
            ></input>
            <label htmlFor="checkbox">
              I accept <a href="">Terms and Conditions</a>
            </label>
            {formik.errors.checkbox ? (
              <span className="validation-error">{formik.errors.checkbox}</span>
            ) : null}
          </div>
          <div className="submit-button">
            <button className="submitBtnCreateAccount" type="submit">
              Create Account
            </button>
          </div>
          <div className="redirect-field">
            <label>
              Already have an account?<a href=""> Login</a>{" "}
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

export default SignUp;
