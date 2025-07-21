// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const handleApiResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    // Si la respuesta no es OK (ej. 400, 401, 500), lanzar un error con el mensaje del backend
    throw new Error(data.message || "Algo salió mal en la petición.");
  }
  return data;
};

const registerUser = async (email, password, firstName, lastName) => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, firstName, lastName }),
  });
  return handleApiResponse(response); 
};

const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return handleApiResponse(response);
};

// --- NUEVOS SERVICIOS DE PERFIL DE USUARIO ---

const fetchUserProfile = async (token) => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return handleApiResponse(response); // Devuelve { success, message, user }
};

const updateProfile = async (userData, token) => {
  const response = await fetch(`${API_BASE_URL}/auth/updateMe`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData), // userData contendrá firstName, lastName, email
  });
  return handleApiResponse(response); // Devuelve { success, message, user }
};

const changeUserPassword = async (passwordData, token) => {
  const response = await fetch(`${API_BASE_URL}/auth/updatePassword`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(passwordData), // passwordData contendrá currentPassword, newPassword
  });
  return handleApiResponse(response); // Devuelve { success, message }
};

// --- SERVICIOS DE LIBROS ---
const getBooks = async (token) => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return handleApiResponse(response); // Devuelve { success, message, data: [BookObject, ...] }
};

const createBook = async (bookData, token) => {
  const response = await fetch(`${API_BASE_URL}/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData), // bookData debe ser un objeto con title, author, etc.
  });
  return handleApiResponse(response); // Devuelve { success, message, data: BookObject }
};

const updateBook = async (id, updatedData, token) => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });
  return handleApiResponse(response); // Devuelve { success, message, data: BookObjectActualizado }
};

const deleteBook = async (id, token) => {
  const response = await fetch(`${API_BASE_URL}/books/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // Para DELETE, si la respuesta es 204 No Content, handleApiResponse no recibiría JSON.
  // Tu handleApiResponse lanza un error si !response.ok, lo cual está bien.
  // Si la eliminación es exitosa (204 No Content), no hay cuerpo, por eso manejo explícitamente aquí.
  if (response.status === 204) {
    return { success: true, message: "Libro eliminado exitosamente." };
  }
  return handleApiResponse(response);
};

export {
  registerUser,
  loginUser,
  fetchUserProfile, // <--- EXPORTAR
  updateProfile, // <--- EXPORTAR
  changeUserPassword, // <--- EXPORTAR
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};