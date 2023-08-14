import React from 'react';
import { Route, Routes} from 'react-router';
import './App.css';
import Calc from './components/calc'

function App() {
  return (
    <Routes>
        <Route index element={<Calc history='History' />} />
    </Routes>
  );
}

export default App;
