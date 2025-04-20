import React from "react";
import { useFormik } from "formik";
import signUpFormValidation from "../utilities/signUpFormValidation";
import LogotypeLink from "../partials/components/LogotypeLink.jsx";

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
      // POST-anrop
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div>
      <section id="signup">
        <div className="card">
          <div className="card-header">
            <h1>Create Account</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  name="firstName"
                  className="form-input"
                  type="text"
                  placeholder="Enter your first name"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                ></input>
                {/* Göra generisk? */}{" "}
                {formik.errors.firstName ? (
                  <span className="validation-error">
                    {formik.errors.firstName}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  name="lastName"
                  className="form-input"
                  type="text"
                  placeholder="Enter your last name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                ></input>

                {formik.errors.lastName ? (
                  <span className="validation-error">
                    {formik.errors.lastName}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  className="form-input"
                  type="text"
                  placeholder="Enter your email address"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                ></input>

                {formik.errors.email ? (
                  <span className="validation-error">
                    {formik.errors.email}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  className="form-input"
                  type="text"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                ></input>

                {formik.errors.password ? (
                  <span className="validation-error">
                    {formik.errors.password}
                  </span>
                ) : null}
              </div>
              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  name="passwordConfirm"
                  className="form-input"
                  type="text"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirm}
                ></input>

                {formik.errors.passwordConfirm ? (
                  <span className="validation-error">
                    {formik.errors.passwordConfirm}
                  </span>
                ) : null}
              </div>
              <div className="form-checkbox-group">
                <label className="form-checkbox">
                  <input
                    name="checkbox"
                    id="terms-checkbox"
                    className="form-checkbox-input"
                    type="checkbox"
                    onChange={formik.handleChange}
                    value={formik.values.checkbox}
                  />
                  <span className="form-checkbox-box"></span>
                </label>
                <label htmlFor="terms-checkbox" className="form-label">
                  I accept <a href="#">Terms and Conditions</a>
                </label>
                {formik.errors.checkbox ? (
                  <span className="validation-error">
                    {formik.errors.checkbox}
                  </span>
                ) : null}
              </div>
              <button type="submit" className="btn">
                Create Account
              </button>
            </form>
          </div>
          <div className="card-footer">
            Already have an account? <a href="#">Log in </a>
          </div>
        </div>
      </section>
      <div className="logotype">
        <LogotypeLink></LogotypeLink>
      </div>
    </div>
  );
};

export default SignUp;
