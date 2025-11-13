import { useState } from 'react';
import BibliotecaJuegos from './componentes/BibliotecaJuegos';
import ModoOscuro from './componentes/ModoOscuro';
import './App.css';

function App() {
  return (
    <div className="App">
      <ModoOscuro />
      <BibliotecaJuegos />
    </div>
  );
}

export default App;