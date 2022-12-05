import { Fragment, useState } from 'react';
import Employee from './Employee';

const Query = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [employees, setEmployees] = useState([]);

  const handleSubmit = e => {
    e.preventDefault(); // Prevent page from reloading

    fetch('http://localhost:3000/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data[0].message != null) {
          console.log(data[0].message);
        } else {
          setEmployees(data);
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <Fragment>
      <div className='container mb-3'>
        <h1 className='text-center'>Query Data</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>
              Username:
            </label>
            <input
              id='username'
              type='text'
              className='form-control'
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password:
            </label>
            <input
              id='password'
              type='password'
              className='form-control'
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-primary btn-login'>
            Query
          </button>
        </form>
      </div>
      <div className='container'>
        <ul className='list-group'>
          {employees.map((employee, index) => {
            return (
              <Employee
                key={index}
                id={employee.user_id}
                username={employee.username}
                email={employee.email}
                salary={employee.salary}
                setEmployees={setEmployees}
              />
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default Query;
