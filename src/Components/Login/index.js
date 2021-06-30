import React, { useState } from 'react';

import { useHistory } from 'react-router';
import axios from 'axios';

import HeaderProfile from '../Header';

import './index.css';

function SignIn() {
  const [logName, setLogName] = useState('');
  const [logPass, setLogPass] = useState('');
  const [logError, setLogError] = useState(false);
  // const [data, setData] = useState(null);

  let history = useHistory();

  const login = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: 'POST',
        data: {
          username: logName,
          password: logPass,
          isAdmin: false,
        },
        withCredentials: true,
        url: 'http://localhost:5000/login',
      }).then((res) => {
        if (res.data.isAdmin) {
          history.push('/admin');
        } else {
          console.log(res);
          history.push('/profile');
          // setData(res.data);
        }
      });
    } catch (err) {
      setLogError(true);
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <HeaderProfile />
      <div className="signin">
        <form onSubmit={login} className="signin-form">
          <h2>Login</h2>
          <div className="form-group">
            <input
              placeholder="Email"
              className="form-control"
              onChange={(e) => setLogName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              placeholder="Password"
              className="form-control"
              onChange={(e) => setLogPass(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-secondary btn-lg btn-block">
            Submit
          </button>
          {logError && <p>Incorrect email or password</p>}
          {/* {data && (
          <h1>
            Welcome {data.firstName} {data.lastName}
          </h1>
        )} */}
        </form>
      </div>
    </div>
  );
}

export default SignIn;