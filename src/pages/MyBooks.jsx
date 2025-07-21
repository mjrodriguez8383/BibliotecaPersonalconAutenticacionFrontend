// src/pages/MyBooks.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/toastContext"; // Importa useToast
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../services/api";

const MyBooks = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookAuthor, setNewBookAuthor] = useState("");
  const [newBookGenre, setNewBookGenre] = useState("");
  const [newBookYear, setNewBookYear] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const responseData = await getBooks(token);
        
        if (responseData && responseData.data) {
          setBooks(responseData.data);
          // showToast("Libros cargados exitosamente.", "success"); // Opcional: toast al cargar
        } else {
          setError(responseData.message || "Formato de respuesta inesperado al cargar libros.");
          // showToast(responseData.message || "Formato de respuesta inesperado al cargar libros.", "error");
        }

      } catch (err) {
        console.error("Error al obtener libros:", err);
        setError(err.message || "No se pudieron cargar los libros.");
        showToast(err.message || "No se pudieron cargar los libros.", "error");

        if (err.message && (err.message.includes("401") || err.message.includes("logueado") || err.message.includes("existe"))) {
            logout();
            navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [token, logout, navigate, showToast]); // Añade showToast a las dependencias

  const handleCreateBook = async (e) => {
    e.preventDefault();
    if (!newBookTitle || !newBookAuthor) {
      showToast("Título y Autor son obligatorios.", "error"); // Usar toast
      return;
    }

    try {
      const bookData = {
        title: newBookTitle,
        author: newBookAuthor,
        genre: newBookGenre,
        publicationYear: newBookYear ? parseInt(newBookYear) : undefined,
        read: false,
      };
      const responseData = await createBook(bookData, token);
      if (responseData && responseData.data) {
        setBooks([...books, responseData.data]);
        setNewBookTitle("");
        setNewBookAuthor("");
        setNewBookGenre("");
        setNewBookYear("");
        showToast("Libro creado exitosamente.", "success"); // Usar toast
      } else {
        showToast(responseData.message || "Error al crear el libro.", "error"); // Usar toast
      }
    } catch (err) {
      console.error("Error al crear libro:", err);
      showToast(err.message || "No se pudo crear el libro.", "error"); // Usar toast
    }
  };

  const handleToggleRead = async (id, currentReadStatus) => {
    try {
      const updatedData = { read: !currentReadStatus };
      const responseData = await updateBook(id, updatedData, token);
      if (responseData && responseData.data) {
        setBooks(
          books.map((book) => (book._id === id ? responseData.data : book))
        );
        showToast(`Libro marcado como ${responseData.data.read ? "leído" : "no leído"}.`, "success"); // Usar toast
      } else {
        showToast(responseData.message || "Error al actualizar el estado de lectura.", "error"); // Usar toast
      }
    } catch (err) {
      console.error("Error al actualizar libro:", err);
      showToast(err.message || "No se pudo actualizar el libro.", "error"); // Usar toast
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este libro?")) {
      return;
    }
    try {
      await deleteBook(id, token);
      setBooks(books.filter((book) => book._id !== id));
      showToast("Libro eliminado exitosamente.", "success"); // Usar toast
    } catch (err) {
      console.error("Error al eliminar libro:", err);
      showToast(err.message || "No se pudo eliminar el libro.", "error"); // Usar toast
    }
  };

  if (loading) {
    return <h2 className="loading-message">Cargando libros...</h2>;
  }

  if (error && books.length === 0) {
    return (
      <>
        <h1>Error al cargar libros:</h1>
        <p className="error-message">{error}</p>
      </>
    );
  }

  return (
    <div className="mybooks-content">
      <h2>Añadir Nuevo Libro</h2>
      <form onSubmit={handleCreateBook}>
        <input
          type="text"
          placeholder="Título (obligatorio)"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor (obligatorio)"
          value={newBookAuthor}
          onChange={(e) => setNewBookAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Género"
          value={newBookGenre}
          onChange={(e) => setNewBookGenre(e.target.value)}
        />
        <input
          type="number"
          placeholder="Año de Publicación"
          value={newBookYear}
          onChange={(e) => setNewBookYear(e.target.value)}
        />
        <button type="submit">Añadir Libro</button>
      </form>

      <h2>Mis Libros</h2>
      {books.length === 0 && !loading && !error ? (
        <p>No tienes libros en tu biblioteca. ¡Añade uno!</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h3>{book.title}</h3>
              <p>
                <strong>Autor:</strong> {book.author}
              </p>
              {book.genre && <p><strong>Género:</strong> {book.genre}</p>}
              {book.publicationYear && (
                <p><strong>Año:</strong> {book.publicationYear}</p>
              )}
              <p>
                <strong>Estado:</strong>{" "}
                {book.read ? (
                  <span className="book-status read">
                    Leído
                  </span>
                ) : (
                  <span className="book-status pending">
                    Pendiente
                  </span>
                )}
              </p>
              <div className="button-group">
                <button onClick={() => handleToggleRead(book._id, book.read)}>
                  Marcar como {book.read ? "No Leído" : "Leído"}
                </button>
                <button 
                  onClick={() => handleDeleteBook(book._id)} 
                  className="btn-delete-book"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { MyBooks };