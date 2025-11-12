import { useState, useEffect } from 'react';
import FormularioResena from './FormularioResena';
import { obtenerResenasPorJuego, eliminarResena } from '../servicios/resenaServicio';
import './ListaReseñas.css';

function ListaResenas({ juego, onCerrar }) {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [resenaEditar, setResenaEditar] = useState(null);

  useEffect(() => {
    cargarResenas();
  }, [juego._id]);

  const cargarResenas = async () => {
    try {
      setCargando(true);
      const data = await obtenerResenasPorJuego(juego._id);
      setResenas(data);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      try {
        await eliminarResena(id);
        cargarResenas();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar la reseña');
      }
    }
  };

  const renderEstrellas = (puntuacion) => {
    return '⭐'.repeat(puntuacion) + '☆'.repeat(5 - puntuacion);
  };

  return (
    <div className="resenas-overlay">
      <div className="resenas-container">
        <div className="resenas-header">
          <div>
            <h2>📝 Reseñas de {juego.titulo}</h2>
            <p className="total-resenas">{resenas.length} reseña(s)</p>
          </div>
          <button onClick={onCerrar} className="btn-cerrar">✕</button>
        </div>

        <button 
          className="btn-nueva-resena" 
          onClick={() => {
            setResenaEditar(null);
            setMostrarFormulario(true);
          }}
        >
          ➕ Escribir Reseña
        </button>

        {cargando ? (
          <div className="cargando-resenas">Cargando reseñas...</div>
        ) : resenas.length === 0 ? (
          <div className="sin-resenas">
            <p>No hay reseñas para este juego</p>
            <p>¡Sé el primero en escribir una!</p>
          </div>
        ) : (
          <div className="resenas-lista">
            {resenas.map(resena => (
              <div key={resena._id} className="resena-card">
                <div className="resena-header">
                  <div>
                    <div className="estrellas">{renderEstrellas(resena.puntuacion)}</div>
                    <span className="fecha">
                      {new Date(resena.fechaCreacion).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="resena-acciones">
                    <button 
                      onClick={() => {
                        setResenaEditar(resena);
                        setMostrarFormulario(true);
                      }} 
                      className="btn-editar-mini"
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleEliminar(resena._id)} 
                      className="btn-eliminar-mini"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="resena-contenido">
                  <p>{resena.textoResena}</p>
                </div>

                <div className="resena-detalles">
                  {resena.horasJugadas > 0 && (
                    <span className="detalle">⏱️ {resena.horasJugadas}h jugadas</span>
                  )}
                  <span className="detalle">🎯 {resena.dificultad}</span>
                  <span className={`detalle ${resena.recomendaria ? 'recomendado' : 'no-recomendado'}`}>
                    {resena.recomendaria ? '👍 Recomendado' : '👎 No recomendado'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {mostrarFormulario && (
          <FormularioResena
            juego={juego}
            resenaEditar={resenaEditar}
            onGuardar={() => {
              setMostrarFormulario(false);
              setResenaEditar(null);
              cargarResenas();
            }}
            onCancelar={() => {
              setMostrarFormulario(false);
              setResenaEditar(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default ListaResenas;