export default function signUpFormValidation(values) {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length < 1) {
    errors.firstName = "Must be 1 character or more";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length < 1) {
    errors.lastName = "Must be 1 character or more";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Required";
  } else if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Passwords don't match";
  }

  if (values.checkbox === false) {
    errors.checkbox = "Accept terms and conditions";
  }

  return errors;
}
