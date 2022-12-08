import { useState } from 'react';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegistration = () => {
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email,
      }),
    })
      .then(results => results.json())
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <div
      className='modal'
      id='registrationModal'
      tabIndex='-1'
      aria-labelledby='registrationModal'
      aria-hidden='true'
    >
      <div className='modal-dialog'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h1 className='modal-title'>Registration</h1>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
            ></button>
          </div>
          <div className='modal-body'>
            <label htmlFor='reg-username' className='form-label'>
              Username:
            </label>
            <input
              id='reg-username'
              type='text'
              className='form-control'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <label htmlFor='reg-password' className='form-label'>
              Password:
            </label>
            <input
              id='reg-password'
              type='password'
              className='form-control'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor='reg-email' className='form-label'>
              Email:
            </label>
            <input
              id='reg-email'
              type='text'
              className='form-control'
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className='modal-footer'>
            <button
              type='button'
              className='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
            <button
              type='button'
              className='btn btn-primary btn-register'
              data-bs-dismiss='Register'
              onClick={handleRegistration}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
