import { useState } from 'react';
import Navbar from './components/Navbar';
import Modal from './components/Modal';
import Query from './components/Query';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className='App'>
      <Navbar />
      <Query />
      <Modal />
    </div>
  );
}

export default App;
