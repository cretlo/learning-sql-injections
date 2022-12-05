import React from 'react';

const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg bg-dark'>
      <div className='container-fluid'>
        <a href='#' className='navbar-brand text-white'>
          SQL Injection
        </a>
        <button
          className='btn btn-outline-primary text-white'
          data-bs-toggle='modal'
          data-bs-target='#registrationModal'
        >
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
