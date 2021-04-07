import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

function Form() {
   const initialValues = {
      name: 'hasib',
      email: ''
    };
  
    const onSubmit = values => {
      console.log('onSubmit', values)
    };
  
   //  const validate = values => {
   //    let errors = {};
  
   //    if(!values.name) {
   //      errors.name = "required"
   //    }
  
   //    if(!values.email) {
   //      errors.email = "required"
   //    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
   //      errors.email = "email must be valid mail"
   //    }
  
   //    return errors;
   //  };
  
    const validationSchema = yup.object({
      name: yup.string().required('required'),
      email: yup.string().email('invalid email').required('required')
    })
  
    const formik = useFormik({
      initialValues,
      onSubmit,
      // validate,
      validationSchema
    })
   return (
      <form onSubmit={formik.handleSubmit}>
      <div className="input-box">
        <label htmlFor="name">name
        </label>
          <input 
          type="text" 
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur} 
          value={formik.values.name} />
          {(formik.touched.name && formik.errors.name) && <small className="err-mss">{formik.errors.name}</small>}
      </div>

      <div className="input-box">
        <label htmlFor="name">email
        </label>
          <input 
          type="text" 
          id="email"
          name="email"
          onChange={formik.handleChange} 
          value={formik.values.email}
          onBlur={formik.handleBlur} />
          {(formik.touched.email && formik.errors.email) && <small className="err-mss">{formik.errors.email}</small>}
      </div>

      <button type="submit">submit</button>
    </form>
   )
}

export default Form
