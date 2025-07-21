// src/components/Toast.jsx
import React, { useEffect, useState } from 'react';

const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose(); // Llama a la función onClose para limpiar el mensaje en el padre
        }
      }, 3000); // El toast desaparecerá después de 3 segundos (3000 ms)

      return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta o el mensaje cambia
    } else {
      setIsVisible(false);
    }
  }, [message, onClose]);

  if (!isVisible) return null;

  const toastClass = `toast-notification ${type}`;

  return (
    <div className={toastClass}>
      {message}
      <button onClick={() => { setIsVisible(false); if (onClose) onClose(); }} className="toast-close-button">
        &times; {/* Símbolo de "x" para cerrar */}
      </button>
    </div>
  );
};

export { Toast };