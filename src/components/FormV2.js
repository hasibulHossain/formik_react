import React from "react";
import * as yup from "yup";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import ValidationError from "./validationError/validationError";
import validationError from "./validationError/validationError";

import MyField from './Myfield/Myfield'

function FormV2() {
  const initialValues = {
    name: "",
    email: "",
    comments: "",
    address: "",
    social: {
      facebook: "",
      instagram: "",
    },
    numbers: [""],
    password: "",
  };

  const onSubmit = (values) => {
    console.log("onSubmit", values);
    alert({ ...values });
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .min(2, "at least 2 character!")
      .required("required"),
    email: yup.string().email("invalid email").required("required"),
    address: yup
      .string()
      .min(3, "should be 3 character at least")
      .required("required"),
    password: yup
      .string()
      .min(4, "password minium character would be 3 and maximum would be 8")
      .max(8, "password minium character would be 3 and maximum would be 8")
      .required("required"),
  });

  return (
    <Formik
      initialValues={ initialValues }
      onSubmit={ onSubmit }
      validationSchema={ validationSchema }
      validateOnMount
    >
      {(formikProps) => {
        return (
          <Form autoComplete="off">
            <div style={ { width: "70%" } }>
              <div className="input-box">
                <label htmlFor="name">name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component={ ValidationError } />
              </div>
              <div className="input-box">
                <label htmlFor="email">emailss</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component={ ValidationError } />
              </div>
              <div className="input-box">
                <label htmlFor="name&email">Name + Email</label>
                <MyField type="text" id="name&email" name="name&email" />
                <ErrorMessage name="name&email" component={ ValidationError } />
              </div>
              <div className="input-box">
                <label htmlFor="password">password</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component={ ValidationError } />
              </div>
              <div className="input-box">
                <label htmlFor="comments">Message</label>
                <Field as="textarea" id="message" name="comments" />
                <ErrorMessage name="comments" component={ ValidationError } />
              </div>

              <div className="input-box">
                <label htmlFor="facebook">facebook</label>
                <Field type="text" id="facebook" name="social.facebook" />
                <ErrorMessage name="facebook" component={ ValidationError } />
              </div>

              <div className="input-box">
                <label htmlFor="instagram">instagram</label>
                <Field type="text" id="instagram" name="social.instagram" />
                <ErrorMessage name="instagram" component={ ValidationError } />
              </div>

              <div className="input-box">
                <label htmlFor="name">Address</label>
                <Field validateOnChange={ false } name="address">
                  { (props) => {
                    const { field } = props;
                    return (
                      <>
                        <input
                          id="address"
                          type="text"
                          onChange={ () => (props.form.validateOnChange = false) }
                          { ...field }
                        />
                        <ErrorMessage
                          name="address"
                          component={ validationError }
                        />
                      </>
                    );
                  } }
                </Field>
              </div>
              {/* fieldarray te problem ase. field a push method run holei onSubmit trigger hoi */ }
              {/* <div className="input-box">
                <label htmlFor="name">Phone number</label>
                <FieldArray name="numbers">
                  {(props) => {
                    props.form.validateOnChange = false;
                    const { push, remove, form } = props;
                    const { values } = form;
                    const { numbers } = values;
                    return (
                      <div style={{ marginBottom: "3em" }}>
                        {numbers.map((number, index) => (
                          <div style={{ display: "inlineBlock" }} key={index}>
                            <Field name={`numbers[${index}]`}>
                              {(props) => {
                                const { field, form } = props;
                                form.validateOnChange = false;
                                return (
                                  <input
                                    type="text"
                                    id={`numbers[${index}]`}
                                    {...field}
                                  />
                                );
                              }}
                            </Field>
                            <button
                              style={{ display: "inline" }}
                              onClick={() => remove(index)}
                            >
                              -
                            </button>
                            <button
                              style={{ display: "inline" }}
                              onClick={() => push("")}
                            >
                              +
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  }}
                </FieldArray>
              </div> */}

              <button type="submit" disabled={ !formikProps.isValid }>
                submit
              </button>
            </div>
          </Form>
        );
      } }
    </Formik>
  );
}

export default FormV2;
