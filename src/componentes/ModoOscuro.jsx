import { useState, useEffect } from 'react';
import './ModoOscuro.css';

function ModoOscuro() {
  const [oscuro, setOscuro] = useState(() => {
    const guardado = localStorage.getItem('modo-oscuro');
    return guardado === 'true';
  });

  useEffect(() => {
    // Aplicar o quitar la clase al body
    if (oscuro) {
      document.body.classList.add('modo-oscuro');
      localStorage.setItem('modo-oscuro', 'true');
    } else {
      document.body.classList.remove('modo-oscuro');
      localStorage.setItem('modo-oscuro', 'false');
    }
  }, [oscuro]);

  const toggleModoOscuro = () => {
    setOscuro(!oscuro);
  };

  return (
    <button 
      className="toggle-modo-oscuro" 
      onClick={toggleModoOscuro}
      title={oscuro ? 'Modo claro' : 'Modo oscuro'}
    >
      {oscuro ? '☀️' : '🌙'}
    </button>
  );
}

export default ModoOscuro;