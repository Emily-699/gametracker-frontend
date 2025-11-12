import './VistaGaleria.css';

function VistaGaleria({ juegos, onEditar, onEliminar, onVerReseñas }) {
  // Separar juegos por estado
  const jugandoAhora = juegos.filter(j => !j.completado && j.enProgreso);
  const siguientes = juegos.filter(j => !j.completado && !j.enProgreso);
  const completados = juegos.filter(j => j.completado);

  const TarjetaGaleria = ({ juego }) => (
    <div className="tarjeta-galeria">
      <div 
        className="galeria-portada"
        style={{ backgroundImage: `url(${juego.imagenPortada || 'https://via.placeholder.com/400x250?text=Sin+Portada'})` }}
      >
        {juego.completado && (
          <span className="badge-completado-galeria">✓ Completado</span>
        )}
        <div className="galeria-overlay">
          <button onClick={() => onVerReseñas(juego._id)} className="btn-overlay">
            📝 Reseñas
          </button>
          <button onClick={() => onEditar(juego)} className="btn-overlay">
            ✏️ Editar
          </button>
          <button onClick={() => onEliminar(juego._id)} className="btn-overlay btn-overlay-eliminar">
            🗑️
          </button>
        </div>
      </div>
      <div className="galeria-info">
        <h4>{juego.titulo}</h4>
        <div className="galeria-meta">
          <span className="meta-tag">{juego.genero}</span>
          <span className="meta-tag">{juego.plataforma}</span>
        </div>
        {juego.desarrollador && (
          <p className="galeria-desarrollador">{juego.desarrollador}</p>
        )}
      </div>
    </div>
  );

  const Seccion = ({ titulo, juegos, icono }) => {
    if (juegos.length === 0) return null;
    
    return (
      <div className="galeria-seccion">
        <h3 className="galeria-titulo-seccion">
          <span className="seccion-icono">{icono}</span>
          {titulo}
          <span className="seccion-contador">{juegos.length}</span>
        </h3>
        <div className="galeria-grid">
          {juegos.map(juego => (
            <TarjetaGaleria key={juego._id} juego={juego} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="vista-galeria">
      <Seccion 
        titulo="Currently Playing" 
        juegos={jugandoAhora}
        icono="🎮"
      />
      <Seccion 
        titulo="Up Next" 
        juegos={siguientes}
        icono="⏭️"
      />
      <Seccion 
        titulo="Library" 
        juegos={completados}
        icono="📚"
      />
    </div>
  );
}

export default VistaGaleria;