import React from 'react';
import Loader from './Loader';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#000'
    }}>
      <Loader />
    </div>
  );
}

export default App;
