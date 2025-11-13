import { useState, useEffect } from 'react';
import './FormularioJuego.css';

function FormularioJuego({ juegoEditar, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: '',
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false
  });

  const [imagenPreview, setImagenPreview] = useState('');
  const [imagenError, setImagenError] = useState(false);

  const generos = ['Acción', 'RPG', 'Aventura', 'Deportes', 'Estrategia', 'Puzzle', 'Simulación', 'Terror', 'Carreras', 'Plataformas', 'Shooter', 'Otro'];
  const plataformas = ['PC', 'PlayStation 4', 'PlayStation 5', 'Xbox One', 'Xbox Series X/S', 'Nintendo Switch', 'Mobile', 'Otra'];

  useEffect(() => {
    if (juegoEditar) {
      setFormData({
        titulo: juegoEditar.titulo || '',
        genero: juegoEditar.genero || '',
        plataforma: juegoEditar.plataforma || '',
        añoLanzamiento: juegoEditar.añoLanzamiento || '',
        desarrollador: juegoEditar.desarrollador || '',
        imagenPortada: juegoEditar.imagenPortada || '',
        descripcion: juegoEditar.descripcion || '',
        completado: juegoEditar.completado || false
      });
      setImagenPreview(juegoEditar.imagenPortada || '');
    }
  }, [juegoEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Si cambia la URL de la imagen, actualizar preview
    if (name === 'imagenPortada') {
      setImagenPreview(value);
      setImagenError(false);
    }
  };

  const handleImagenError = () => {
    setImagenError(true);
  };

  const handleImagenLoad = () => {
    setImagenError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
  };

  return (
    <div className="formulario-overlay">
      <div className="formulario-container">
        <h2>{juegoEditar ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'}</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              required
              placeholder="Nombre del juego"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Género *</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un género</option>
                {generos.map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Plataforma *</label>
              <select
                name="plataforma"
                value={formData.plataforma}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una plataforma</option>
                {plataformas.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Año de Lanzamiento</label>
              <input
                type="number"
                name="añoLanzamiento"
                value={formData.añoLanzamiento}
                onChange={handleChange}
                min="1970"
                max={new Date().getFullYear()}
                placeholder="2024"
              />
            </div>

            <div className="form-group">
              <label>Desarrollador</label>
              <input
                type="text"
                name="desarrollador"
                value={formData.desarrollador}
                onChange={handleChange}
                placeholder="Nombre del desarrollador"
              />
            </div>
          </div>

          {/* SECCIÓN MEJORADA DE IMAGEN */}
          <div className="form-group">
            <label>🖼️ URL de la Portada del Juego</label>
            <input
              type="url"
              name="imagenPortada"
              value={formData.imagenPortada}
              onChange={handleChange}
              placeholder="https://ejemplo.com/portada-juego.jpg"
            />
            <small className="imagen-url-tip">
              💡 Pega aquí la URL de una imagen
            </small>

            {imagenPreview && (
              <div className="imagen-preview-container">
                <p className="imagen-preview-text">Vista previa:</p>
                {!imagenError ? (
                  <img
                    src={imagenPreview}
                    alt="Preview"
                    onError={handleImagenError}
                    onLoad={handleImagenLoad}
                    className="imagen-preview"
                  />
                ) : (
                  <div className="imagen-error">
                    <p>⚠️ No se pudo cargar la imagen. Verifica que la URL sea correcta.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              maxLength="1000"
              placeholder="Descripción del juego..."
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="completado"
                checked={formData.completado}
                onChange={handleChange}
              />
              <span>Juego completado</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancelar} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              {juegoEditar ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioJuego;