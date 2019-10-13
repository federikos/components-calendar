import React from 'react';
import Calendar from './Calendar'
import './css/main.css';

function App() {
  const now = new Date(2017, 2, 8);

  // внутри компонента App:
  return (
    <Calendar date={now} />
  );
}

export default App;
