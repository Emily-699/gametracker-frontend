import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resenas';

// Obtener todas las reseñas
export const obtenerResenas = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    throw error;
  }
};

// Obtener reseñas de un juego específico
export const obtenerResenasPorJuego = async (juegoId) => {
  try {
    const response = await axios.get(`${API_URL}/juego/${juegoId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener reseñas del juego:', error);
    throw error;
  }
};

// Crear una nueva reseña
export const crearResena = async (resena) => {
  try {
    const response = await axios.post(API_URL, resena);
    return response.data.data;
  } catch (error) {
    console.error('Error al crear reseña:', error);
    throw error;
  }
};

// Actualizar una reseña
export const actualizarResena = async (id, resena) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, resena);
    return response.data.data;
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    throw error;
  }
};

// Eliminar una reseña
export const eliminarResena = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    throw error;
  }
};