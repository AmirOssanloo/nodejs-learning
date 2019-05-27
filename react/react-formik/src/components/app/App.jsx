import React from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import ErrorList from "../error-list/ErrorList";
import Input from "../input/Input";
import styles from "./App.css";

const loginInitialValues = {
  email: ""
  // password: ""
};

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .min(6, "Please enter at least 6 characters")
    .max(40, "Please enter no more than 40 characters")
    .email("Please enter a valid email")
    .required("This field is required")
  // password: Yup.string()
  //   .min(6, "Please enter at least 6 characters")
  //   .max(40, "Please enter no more than 40 characters")
  //   .required("Please enter a password")
});

const loginSubmit = (values, setSubmitting) => {
  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, 400);
};

const App = () => {
  return (
    <div>
      <h1>Hello</h1>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          loginSubmit(values, setSubmitting);
        }}
      >
        {props => {
          const {
            touched,
            errors,
            handleChange,
            handleBlur,
            isSubmitting
          } = props;
          return (
            <Form>
              <Field
                name="email"
                type="email"
                touched={touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
                component={Input}
              />
              <ErrorMessage
                name="email"
                errors={errors.email}
                component={ErrorList}
              />
              <button type="submit" disabled={isSubmitting}>
                Submitting
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default App;

{
  /* <Field
name="password"
type="password"
touched={touched}
onChange={handleChange}
onBlur={handleBlur}
component={Input}
/>
<ErrorMessage
name="password"
errors={errors.password}
onChange={handleChange}
onBlur={handleBlur}
component={ErrorList}
/> */
}
