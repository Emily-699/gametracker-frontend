import { useState, useEffect } from 'react';
import './EstadisticasPersonales.css';

function EstadisticasPersonales({ juegos, resenas, onCerrar }) {
  const [stats, setStats] = useState({
    totalJuegos: 0,
    completados: 0,
    pendientes: 0,
    totalResenas: 0,
    promedioCalificacion: 0,
    horasTotales: 0,
    generos: {},
    plataformas: {}
  });

  useEffect(() => {
    calcularEstadisticas();
  }, [juegos, resenas]);

  const calcularEstadisticas = () => {
    const totalJuegos = juegos.length;
    const completados = juegos.filter(j => j.completado).length;
    const pendientes = totalJuegos - completados;
    
    // Calcular géneros
    const generos = {};
    juegos.forEach(juego => {
      generos[juego.genero] = (generos[juego.genero] || 0) + 1;
    });

    // Calcular plataformas
    const plataformas = {};
    juegos.forEach(juego => {
      plataformas[juego.plataforma] = (plataformas[juego.plataforma] || 0) + 1;
    });

    // Calcular promedio de calificación
    const totalCalificaciones = resenas.reduce((sum, r) => sum + r.puntuacion, 0);
    const promedioCalificacion = resenas.length > 0 ? (totalCalificaciones / resenas.length).toFixed(1) : 0;

    // Calcular horas totales
    const horasTotales = resenas.reduce((sum, r) => sum + (r.horasJugadas || 0), 0);

    setStats({
      totalJuegos,
      completados,
      pendientes,
      totalResenas: resenas.length,
      promedioCalificacion,
      horasTotales,
      generos,
      plataformas
    });
  };

  const getTopGenero = () => {
    const entries = Object.entries(stats.generos);
    if (entries.length === 0) return 'N/A';
    return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  const getTopPlataforma = () => {
    const entries = Object.entries(stats.plataformas);
    if (entries.length === 0) return 'N/A';
    return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };

  const porcentajeCompletados = stats.totalJuegos > 0 
    ? ((stats.completados / stats.totalJuegos) * 100).toFixed(1) 
    : 0;

  return (
    <div className="estadisticas-overlay">
      <div className="estadisticas-container">
        <div className="estadisticas-header">
          <h2>📊 Mis Estadísticas de Juego</h2>
          <button onClick={onCerrar} className="btn-cerrar-stats">✕</button>
        </div>

        <div className="stats-grid">
          <div className="stat-card stat-principal">
            <div className="stat-icon">🎮</div>
            <div className="stat-info">
              <h3>{stats.totalJuegos}</h3>
              <p>Juegos en Biblioteca</p>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.completados}</h3>
              <p>Juegos Completados</p>
              <div className="stat-progress">
                <div 
                  className="stat-progress-bar" 
                  style={{ width: `${porcentajeCompletados}%` }}
                ></div>
              </div>
              <span className="stat-percentage">{porcentajeCompletados}%</span>
            </div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats.pendientes}</h3>
              <p>Por Completar</p>
            </div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <h3>{stats.totalResenas}</h3>
              <p>Reseñas Escritas</p>
            </div>
          </div>

          <div className="stat-card stat-star">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <h3>{stats.promedioCalificacion}</h3>
              <p>Calificación Promedio</p>
              <div className="estrellas-promedio">
                {'⭐'.repeat(Math.round(stats.promedioCalificacion))}
                {'☆'.repeat(5 - Math.round(stats.promedioCalificacion))}
              </div>
            </div>
          </div>

          <div className="stat-card stat-time">
            <div className="stat-icon">⏱️</div>
            <div className="stat-info">
              <h3>{stats.horasTotales}</h3>
              <p>Horas Jugadas</p>
            </div>
          </div>
        </div>

        <div className="stats-details">
          <div className="detail-section">
            <h3>🎯 Género Favorito</h3>
            <div className="detail-content">
              <span className="detail-badge">{getTopGenero()}</span>
            </div>
          </div>

          <div className="detail-section">
            <h3>🕹️ Plataforma Principal</h3>
            <div className="detail-content">
              <span className="detail-badge">{getTopPlataforma()}</span>
            </div>
          </div>
        </div>

        {Object.keys(stats.generos).length > 0 && (
          <div className="chart-section">
            <h3>📊 Distribución por Género</h3>
            <div className="chart-bars">
              {Object.entries(stats.generos)
                .sort((a, b) => b[1] - a[1])
                .map(([genero, cantidad]) => {
                  const porcentaje = (cantidad / stats.totalJuegos) * 100;
                  return (
                    <div key={genero} className="chart-bar-item">
                      <div className="chart-label">
                        <span>{genero}</span>
                        <span className="chart-value">{cantidad}</span>
                      </div>
                      <div className="chart-bar">
                        <div 
                          className="chart-bar-fill" 
                          style={{ width: `${porcentaje}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EstadisticasPersonales;