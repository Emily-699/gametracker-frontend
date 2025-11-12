import './TarjetaJuego.css';

function TarjetaJuego({ juego, onEditar, onEliminar, onVerReseñas }) {
  const imagenPorDefecto = 'https://placehold.co/300x400/cccccc/666666?text=Sin+Portada';
  
  const handleImageError = (e) => {
    // Evitar loop infinito si el placeholder también falla
    if (e.target.src !== imagenPorDefecto) {
      e.target.src = imagenPorDefecto;
    }
  };

  return (
    <div className="tarjeta-juego">
      <div className="tarjeta-imagen">
        <img
          src={juego.imagenPortada || imagenPorDefecto}
          alt={juego.titulo}
          onError={handleImageError}

           style={{
            width: '100%',
            height: '100%',
            objectFit: 'conver',
            objectPosition: 'center'
          }}

        />

        {juego.completado && (
          <span className="badge-completado">✓ Completado</span>
        )}
      </div>

      <div className="tarjeta-contenido">
        <h3>{juego.titulo}</h3>

        <div className="tarjeta-info">
          <p><strong>Género:</strong> {juego.genero}</p>
          <p><strong>Plataforma:</strong> {juego.plataforma}</p>
          {juego.desarrollador && (
            <p><strong>Desarrollador:</strong> {juego.desarrollador}</p>
          )}
          {juego.añoLanzamiento && (
            <p><strong>Año:</strong> {juego.añoLanzamiento}</p>
          )}
        </div>

        {juego.descripcion && (
          <p className="tarjeta-descripcion">{juego.descripcion}</p>
        )}

        <div className="tarjeta-acciones">
          <button onClick={() => onVerReseñas(juego._id)} className="btn-ver">
            📝 Reseñas
          </button>
          <button onClick={() => onEditar(juego)} className="btn-editar">
            ✏️ Editar
          </button>
          <button onClick={() => onEliminar(juego._id)} className="btn-eliminar">
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TarjetaJuego;