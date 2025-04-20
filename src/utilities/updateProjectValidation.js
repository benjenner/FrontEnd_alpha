export default function addProjectValidation(values) {
  const errors = {};

  if (!values.projectName) {
    errors.projectName = "Project Name is required";
  }

  if (!values.clientId) {
    errors.clientId = "Client is required";
  }

  if (!values.description) {
    errors.description = "Description is required";
  }

  if (!values.startDate) {
    errors.startDate = "Start Date is required";
  }

  if (!values.endDate) {
    errors.endDate = "End Date is required";
  }

  if (!values.UserId) {
    errors.UserId = "Project Owner is required";
  }

  if (!values.UserId) {
    errors.UserId = "Project Owner is required";
  }

  if (!values.statusId) {
    errors.statusId = "Status ID is required";
  }

  if (!values.budget) {
    errors.budget = "Budget is required";
  } else if (values.budget <= 0) {
    errors.budget = "Budget must be greater than zero";
  }

  console.log("Formik errors:", errors);

  return errors;
}
