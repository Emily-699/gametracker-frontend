import { useState, useEffect } from 'react';
import { crearResena, actualizarResena } from '../servicios/resenaServicio';
import './FormularioReseña.css';

function FormularioResena({ juego, resenaEditar, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    juegoId: juego._id,
    puntuacion: 5,
    textoResena: '',
    horasJugadas: 0,
    dificultad: 'Normal',
    recomendaria: true
  });

  useEffect(() => {
    if (resenaEditar) {
      setFormData({
        juegoId: resenaEditar.juegoId,
        puntuacion: resenaEditar.puntuacion,
        textoResena: resenaEditar.textoResena,
        horasJugadas: resenaEditar.horasJugadas,
        dificultad: resenaEditar.dificultad,
        recomendaria: resenaEditar.recomendaria
      });
    }
  }, [resenaEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (resenaEditar) {
        await actualizarResena(resenaEditar._id, formData);
        alert('Reseña actualizada exitosamente');
      } else {
        await crearResena(formData);
        alert('Reseña creada exitosamente');
      }
      onGuardar();
    } catch (error) {
      console.error('Error al guardar reseña:', error);
      alert('Error al guardar la reseña');
    }
  };

  const renderEstrellas = () => {
    return (
      <div className="selector-estrellas">
        {[1, 2, 3, 4, 5].map(num => (
          <span
            key={num}
            className={`estrella ${num <= formData.puntuacion ? 'activa' : ''}`}
            onClick={() => setFormData({ ...formData, puntuacion: num })}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="formulario-resena-overlay">
      <div className="formulario-resena-container">
        <h2>{resenaEditar ? '✏️ Editar Reseña' : '📝 Nueva Reseña'}</h2>
        <p className="juego-nombre">Para: {juego.titulo}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Puntuación *</label>
            {renderEstrellas()}
            <p className="puntuacion-texto">{formData.puntuacion} de 5 estrellas</p>
          </div>

          <div className="form-group">
            <label>Tu Reseña *</label>
            <textarea
              name="textoResena"
              value={formData.textoResena}
              onChange={handleChange}
              rows="6"
              minLength="10"
              maxLength="2000"
              required
              placeholder="Escribe tu opinión sobre el juego..."
            />
            <small>{formData.textoResena.length}/2000 caracteres</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Horas Jugadas</label>
              <input
                type="number"
                name="horasJugadas"
                value={formData.horasJugadas}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Dificultad</label>
              <select
                name="dificultad"
                value={formData.dificultad}
                onChange={handleChange}
              >
                <option value="Facil">Fácil</option>
                <option value="Normal">Normal</option>
                <option value="Dificil">Difícil</option>
              </select>
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="recomendaria"
                checked={formData.recomendaria}
                onChange={handleChange}
              />
              <span>¿Recomendarías este juego?</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancelar} className="btn-cancelar">
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              {resenaEditar ? 'Actualizar' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioResena;