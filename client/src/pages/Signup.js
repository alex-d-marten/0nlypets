import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import petSignup from '../images/signup-pets.jpg'
const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error }] = useMutation(ADD_USER);
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
      const { data } = await addUser({
        variables: { ...formState },
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <main className="row w-100 login-main mb-4">
      <div className='d-flex w-100 align-items-center justify-content-center'>
        <div className='col-12 col-md-5'>
            <img src={petSignup} alt="pet holding signup poster" className='w-100' />
        </div>
        <div className="col-12 col-md-5 left-margin">
          <div className="card">
            <h2 className="card-header text-center">Sign Up</h2>
            <div className="card-body">
              <form onSubmit={handleFormSubmit} className="d-flex flex-wrap justify-content-center">
                <input
                  className="form-input w-75 p-2 mt-3"
                  placeholder="Your username"
                  name="username"
                  type="username"
                  id="username"
                  value={formState.username}
                  onChange={handleChange}
                />
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
                  className="form-input w-75 p-2 mt-3"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <div className='w-100 text-center mt-4'>
                  <button className="btn submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              {error && <div>Signup failed</div>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default Signup;