const Employee = ({ id, username, email, salary, setEmployees }) => {
  const handleDelete = () => {
    fetch(`http://localhost:3000/employee/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(employees => {
        console.log(employees);
        setEmployees(employees);
      })
      .catch(err => console.log(err));
  };

  return (
    <li className='list-group-item d-flex flex-row justify-content-between'>
      <div className='d-flex flex-column'>
        <p>Username: {username}</p>
        <p>Email: {email}</p>
        <p>Salary: {salary}</p>
      </div>
      <div className='d-flex flex-column justify-content-around'>
        <button className='btn btn-danger' onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default Employee;
