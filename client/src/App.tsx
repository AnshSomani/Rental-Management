import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // We use the '/api' prefix, which the proxy will handle
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('Error fetching data:', err));
  }, []); // The empty array ensures this runs only once on component mount

  return (
    <>
      <h1>Rental Management App</h1>
      <div className="card">
        <p>
          Message from backend: <strong>{message || 'Loading...'}</strong>
        </p>
      </div>
    </>
  );
}

export default App;