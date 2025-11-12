import { useState, useEffect } from 'react';
import TarjetaJuego from './TarjetaJuego';
import VistaGaleria from './VistaGaeria';
import FormularioJuego from './FormularioJuego';
import ListaResenas from './ListaResenas';
import EstadisticasPersonales from './EstadisticasPersonales';
import { obtenerJuegos, crearJuego, actualizarJuego, eliminarJuego } from '../servicios/juegoServicio';
import { obtenerResenas } from '../servicios/resenaServicio';
import './BibliotecaJuegos.css';

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [juegoEditar, setJuegoEditar] = useState(null);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);
  const [filtro, setFiltro] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [filtroGenero, setFiltroGenero] = useState('todos');
  const [filtroPlataforma, setFiltroPlataforma] = useState('todos');
  const [ordenamiento, setOrdenamiento] = useState('reciente');
  const [vistaActual, setVistaActual] = useState('cuadricula'); // 'cuadricula' o 'galeria'

  useEffect(() => {
    cargarJuegos();
    cargarResenas();
  }, []);

  const cargarJuegos = async () => {
    try {
      setCargando(true);
      const data = await obtenerJuegos();
      setJuegos(data);
    } catch (error) {
      console.error('Error al cargar juegos:', error);
      alert('Error al cargar los juegos');
    } finally {
      setCargando(false);
    }
  };

  const cargarResenas = async () => {
    try {
      const data = await obtenerResenas();
      setResenas(data);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    }
  };

  const handleGuardar = async (datosJuego) => {
    try {
      if (juegoEditar) {
        await actualizarJuego(juegoEditar._id, datosJuego);
        alert('Juego actualizado exitosamente');
      } else {
        await crearJuego(datosJuego);
        alert('Juego creado exitosamente');
      }
      setMostrarFormulario(false);
      setJuegoEditar(null);
      cargarJuegos();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Error al guardar el juego');
    }
  };

  const handleEditar = (juego) => {
    setJuegoEditar(juego);
    setMostrarFormulario(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este juego?')) {
      try {
        await eliminarJuego(id);
        alert('Juego eliminado exitosamente');
        cargarJuegos();
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el juego');
      }
    }
  };

  const handleVerReseñas = (juegoId) => {
    const juego = juegos.find(j => j._id === juegoId);
    setJuegoSeleccionado(juego);
  };

  const juegosFiltrados = juegos.filter(juego => {
    if (filtro === 'completados') return juego.completado;
    if (filtro === 'pendientes') return !juego.completado;
    return true;
  }).filter(juego => {
    // Búsqueda por título o desarrollador
    const textoBusqueda = busqueda.toLowerCase();
    const coincideTitulo = juego.titulo.toLowerCase().includes(textoBusqueda);
    const coincideDesarrollador = juego.desarrollador?.toLowerCase().includes(textoBusqueda);
    return coincideTitulo || coincideDesarrollador;
  }).filter(juego => {
    // Filtro por género
    if (filtroGenero === 'todos') return true;
    return juego.genero === filtroGenero;
  }).filter(juego => {
    // Filtro por plataforma
    if (filtroPlataforma === 'todos') return true;
    return juego.plataforma === filtroPlataforma;
  }).sort((a, b) => {
    // Ordenamiento
    switch (ordenamiento) {
      case 'reciente':
        return new Date(b.fechaCreacion) - new Date(a.fechaCreacion);
      case 'antiguo':
        return new Date(a.fechaCreacion) - new Date(b.fechaCreacion);
      case 'alfabetico':
        return a.titulo.localeCompare(b.titulo);
      case 'año':
        return (b.añoLanzamiento || 0) - (a.añoLanzamiento || 0);
      default:
        return 0;
    }
  });

  const generosUnicos = [...new Set(juegos.map(j => j.genero))];
  const plataformasUnicas = [...new Set(juegos.map(j => j.plataforma))];

  if (cargando) {
    return <div className="cargando">🎮 Cargando juegos...</div>;
  }

  return (
    <div className="biblioteca-container">
      <header className="biblioteca-header">
        <h1>🎮 GameTracker </h1>
        
        {/* Barra de búsqueda */}
        <div className="barra-busqueda">
          <input
            type="text"
            placeholder="🔍 Buscar por título o desarrollador..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-busqueda"
          />
        </div>

        <div className="header-actions">
          <button 
            className="btn-estadisticas" 
            onClick={() => setMostrarEstadisticas(true)}
          >
            📊 Ver Estadísticas
          </button>
          <div className="filtros">
            <button 
              className={filtro === 'todos' ? 'activo' : ''} 
              onClick={() => setFiltro('todos')}
            >
              Todos ({juegos.length})
            </button>
            <button 
              className={filtro === 'completados' ? 'activo' : ''} 
              onClick={() => setFiltro('completados')}
            >
              Completados ({juegos.filter(j => j.completado).length})
            </button>
            <button 
              className={filtro === 'pendientes' ? 'activo' : ''} 
              onClick={() => setFiltro('pendientes')}
            >
              Pendientes ({juegos.filter(j => !j.completado).length})
            </button>
          </div>
          <button 
            className="btn-agregar" 
            onClick={() => {
              setJuegoEditar(null);
              setMostrarFormulario(true);
            }}
          >
            ➕ Agregar Juego
          </button>
        </div>

        {/* Filtros avanzados */}
        <div className="filtros-avanzados">
          <select 
            value={filtroGenero} 
            onChange={(e) => setFiltroGenero(e.target.value)}
            className="select-filtro"
          >
            <option value="todos">🎯 Todos los géneros</option>
            {generosUnicos.map(genero => (
              <option key={genero} value={genero}>{genero}</option>
            ))}
          </select>

          <select 
            value={filtroPlataforma} 
            onChange={(e) => setFiltroPlataforma(e.target.value)}
            className="select-filtro"
          >
            <option value="todos">🕹️ Todas las plataformas</option>
            {plataformasUnicas.map(plataforma => (
              <option key={plataforma} value={plataforma}>{plataforma}</option>
            ))}
          </select>

          <select 
            value={ordenamiento} 
            onChange={(e) => setOrdenamiento(e.target.value)}
            className="select-filtro"
          >
            <option value="reciente">📅 Más reciente</option>
            <option value="antiguo">📅 Más antiguo</option>
            <option value="alfabetico">🔤 A-Z</option>
            <option value="año">📆 Por año</option>
          </select>
        </div>
      </header>

      {juegosFiltrados.length === 0 ? (
        <div className="sin-juegos">
          {juegos.length === 0 ? (
            <>
              <p>No hay juegos en tu biblioteca</p>
              <button 
                className="btn-agregar-grande" 
                onClick={() => setMostrarFormulario(true)}
              >
                ➕ Agregar tu primer juego
              </button>
            </>
          ) : (
            <>
              <p>😔 No se encontraron juegos</p>
              <p style={{ fontSize: '1rem', opacity: 0.8 }}>
                Intenta con otros filtros o búsqueda
              </p>
              <button 
                className="btn-agregar-grande" 
                onClick={() => {
                  setBusqueda('');
                  setFiltroGenero('todos');
                  setFiltroPlataforma('todos');
                  setFiltro('todos');
                }}
              >
                🔄 Limpiar filtros
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="resultados-info">
            <p>Mostrando <strong>{juegosFiltrados.length}</strong> de <strong>{juegos.length}</strong> juegos</p>
          </div>
          <div className="juegos-grid">
            {juegosFiltrados.map(juego => (
              <TarjetaJuego
                key={juego._id}
                juego={juego}
                onEditar={handleEditar}
                onEliminar={handleEliminar}
                onVerReseñas={handleVerReseñas}
              />
            ))}
          </div>
        </>
      )}

      {mostrarFormulario && (
        <FormularioJuego
          juegoEditar={juegoEditar}
          onGuardar={handleGuardar}
          onCancelar={() => {
            setMostrarFormulario(false);
            setJuegoEditar(null);
          }}
        />
      )}

      {juegoSeleccionado && (
        <ListaResenas
          juego={juegoSeleccionado}
          onCerrar={() => setJuegoSeleccionado(null)}
        />
      )}

      {mostrarEstadisticas && (
        <EstadisticasPersonales
          juegos={juegos}
          resenas={resenas}
          onCerrar={() => setMostrarEstadisticas(false)}
        />
      )}
    </div>
  );
}

export default BibliotecaJuegos;