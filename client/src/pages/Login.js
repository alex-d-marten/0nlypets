import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import dogLogin from '../images/dog-login.jpg'
const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <main className="row w-100 login-main mb-4">
      <div className='d-flex w-100 align-items-center justify-content-center'>
        <div className='col-12 col-md-5'>
          <img src={dogLogin} alt="dog login" className='w-100' />
        </div>
        <div className="col-12 col-md-5 left-margin">
          <div className="card">
            <h2 className="card-header text-center">Login</h2>
            <div className="card-body">
              <form onSubmit={handleFormSubmit} className="d-flex flex-wrap justify-content-center">
                <input
                  className="form-input w-75 p-2 mt-3"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input w-75 p-2 mt-4"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <div className='w-100 text-center mt-4'>
                  <button className="btn btn-color submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              {error && <div>Login failed</div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Login;