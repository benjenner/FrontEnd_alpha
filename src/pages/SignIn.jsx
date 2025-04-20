import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import LogotypeLink from "../partials/components/LogotypeLink";
import signInFormValidation from "../utilities/signInFormValidation";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: signInFormValidation,
    onSubmit: async (values) => {
      const result = await signIn(values.email, values.password);
      if (result) {
        console.log("Resultat lyckas");
        navigate("/admin/projects");
      } else {
        console.log("Login declined");
      }
    },
  });

  return (
    <div>
      <section id="signup">
        <div className="card">
          <div className="card-header">
            <h1>Log In</h1>
          </div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
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
              <button type="submit" className="btn">
                Log In
              </button>
            </form>
          </div>
          <div className="card-footer">
            Don't have an account? <a href="#">Sign Up </a>
          </div>
        </div>
      </section>
      <div className="logotype">
        <LogotypeLink></LogotypeLink>
      </div>
    </div>
  );
};

export default SignIn;
