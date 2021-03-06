import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import swal from 'sweetalert';

import Header from '../Header';

import './index.css';

function Registration() {
  const [regError, setRegError] = useState(false);
  const { handleSubmit, handleChange, values, touched, errors, handleBlur } = useFormik({
    initialValues: {
      regFirstName: '',
      regLastName: '',
      regEmail: '',
      regPassword: '',
      regConfPassword: '',
    },
    validationSchema: Yup.object({
      regFirstName: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .max(10)
        .min(2)
        .required('Required'),
      regLastName: Yup.string()
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .max(20)
        .min(2)
        .required('Required'),
      regEmail: Yup.string().email('Must be an email! e.g. "user@gmail.com').required('Required'),
      regPassword: Yup.string().min(3, 'Passport must be at least 3 digits').required('Required'),
      regConfPassword: Yup.string()
        .oneOf([Yup.ref('regPassword'), null], 'Password does not match')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios({
          method: 'POST',
          data: {
            firstName: values.regFirstName,
            lastName: values.regLastName,
            email: values.regEmail,
            password: values.regPassword,
            rePassword: values.regConfPassword,
          },
          withCredentials: true,
          url: 'http://localhost:5000/register',
        }).then((res) => {
          swal({
            title: 'Well Done!',
            text: 'You have successfully registered!',
            icon: 'success',
            button: 'Continue',
          }).then(history.push('/login'));
        });
      } catch (err) {
        setRegError(true);
        console.error(err);
      }
    },
  });

  let history = useHistory();

  return (
    <div className="registration-page">
      <Header />
      <div className="registration">
        <form onSubmit={handleSubmit} className="registration-form">
          <h2>Register</h2>
          <div className="form-group">
            <input
              name="regFirstName"
              id="regFirstName"
              onBlur={handleBlur}
              placeholder="First Name"
              onChange={handleChange}
              value={values.regFirstName}
              className="form-control"
            />
            {touched.regFirstName && errors.regFirstName ? <p className='reg-error'>{errors.regFirstName}</p> : null}
          </div>
          <div className="form-group">
            <input
              name="regLastName"
              id="regLastName"
              onBlur={handleBlur}
              placeholder="Last Name"
              onChange={handleChange}
              value={values.regLastName}
              className="form-control"
            />
            {touched.regLastName && errors.regLastName ? <p className='reg-error'>{errors.regLastName}</p> : null}
          </div>
          <div className="form-group">
            <input
              name="regEmail"
              id="regEmail"
              onBlur={handleBlur}
              placeholder="Email"
              onChange={handleChange}
              value={values.regEmail}
              className="form-control"
            />
            {touched.regEmail && errors.regEmail ? <p className='reg-error'>{errors.regEmail}</p> : null}
          </div>
          <div className="form-group">
            <input
              name="regPassword"
              id="regPassword"
              onBlur={handleBlur}
              placeholder="Password"
              onChange={handleChange}
              value={values.regPassword}
              className="form-control"
            />
            {touched.regPassword && errors.regPassword ? <p className='reg-error'>{errors.regPassword}</p> : null}
          </div>
          <div className="form-group">
            <input
              name="regConfPassword"
              id="regConfPassword"
              onBlur={handleBlur}
              placeholder="Confirm Password"
              onChange={handleChange}
              value={values.regConfPassword}
              className="form-control"
            />
            {touched.regConfPassword && errors.regConfPassword ? (
              <p className='reg-error'>{errors.regConfPassword}</p>
            ) : null}
          </div>
          <button type="submit" className="btn btn-secondary btn-ls btn-block">
            Submit
          </button>
          {regError && <p className='reg-error'>Such email already exists</p>}
        </form>
      </div>
    </div>
  );
}

export default Registration;
