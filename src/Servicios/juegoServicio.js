import axios from 'axios';

const API_URL = 'http://localhost:5000/api/juegos';

// Obtener todos los juegos
export const obtenerJuegos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    throw error;
  }
};

// Obtener un juego por ID
export const obtenerJuegoPorId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener juego:', error);
    throw error;
  }
};

// Crear un nuevo juego
export const crearJuego = async (juego) => {
  try {
    const response = await axios.post(API_URL, juego);
    return response.data.data;
  } catch (error) {
    console.error('Error al crear juego:', error);
    throw error;
  }
};

// Actualizar un juego
export const actualizarJuego = async (id, juego) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, juego);
    return response.data.data;
  } catch (error) {
    console.error('Error al actualizar juego:', error);
    throw error;
  }
};

// Eliminar un juego
export const eliminarJuego = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error al eliminar juego:', error);
    throw error;
  }
};