// src/pages/Ajustes.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useToast } from "../context/toastContext"; // Importa useToast
import {
  fetchUserProfile,
  updateProfile,
  changeUserPassword,
} from "../services/api";

const Ajustes = () => {
  const { user, token, setUser, logout } = useAuth();
  const { showToast } = useToast(); // Usa el hook de toast

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [profileFormData, setProfileFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // const [profileMessage, setProfileMessage] = useState(null); // Eliminar
  // const [profileError, setProfileError] = useState(null); // Eliminar
  // const [passwordMessage, setPasswordMessage] = useState(null); // Eliminar
  // const [passwordError, setPasswordError] = useState(null); // Eliminar

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setProfileFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    } else if (token) {
      const loadProfile = async () => {
        try {
          setLoadingProfile(true);
          const result = await fetchUserProfile(token);
          if (result.success && result.user) {
            setUser(result.user);
            setProfileFormData({
              firstName: result.user.firstName || "",
              lastName: result.user.lastName || "",
              email: result.user.email || "",
            });
            // setProfileError(null); // Eliminar
          } else {
            // setProfileError(result.message || "No se pudo cargar el perfil."); // Eliminar
            showToast(result.message || "No se pudo cargar el perfil. Redirigiendo...", "error"); // Usar toast
            logout();
          }
        } catch (err) {
          // setProfileError(err.message || "Error de red al cargar el perfil."); // Eliminar
          showToast(err.message || "Error de red al cargar el perfil. Redirigiendo...", "error"); // Usar toast
          logout();
        } finally {
          setLoadingProfile(false);
        }
      };
      loadProfile();
    }
  }, [user, token, setUser, logout, showToast]); // Añade showToast a las dependencias

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);
    // setProfileMessage(null); // Eliminar
    // setProfileError(null); // Eliminar

    try {
      const result = await updateProfile(profileFormData, token);

      if (result.success) {
        showToast("Perfil actualizado exitosamente.", "success"); // Usar toast
        setUser(result.user);
        setIsEditingProfile(false);
      } else {
        showToast(result.message || "Hubo un error al actualizar el perfil.", "error"); // Usar toast
      }
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      showToast(err.message || "Error de red al intentar actualizar el perfil.", "error"); // Usar toast
    } finally {
      setLoadingProfile(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoadingPassword(true);
    // setPasswordMessage(null); // Eliminar
    // setPasswordError(null); // Eliminar

    if (passwordFormData.newPassword !== passwordFormData.confirmNewPassword) {
      showToast("Las nuevas contraseñas no coinciden.", "error"); // Usar toast
      setLoadingPassword(false);
      return;
    }

    try {
      const result = await changeUserPassword({
        currentPassword: passwordFormData.currentPassword,
        newPassword: passwordFormData.newPassword,
      }, token);

      if (result.success) {
        showToast(result.message, "success"); // Usar toast
        setPasswordFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setShowPasswordForm(false);
      } else {
        showToast(result.message || "Hubo un error al cambiar la contraseña.", "error"); // Usar toast
      }
    } catch (err) {
      console.error("Error al cambiar contraseña:", err);
      showToast(err.message || "Error de red al intentar cambiar la contraseña.", "error"); // Usar toast
    } finally {
      setLoadingPassword(false);
    }
  };

  if (loadingProfile && !user) {
    return (
      <>
        <h1>Cargando Ajustes...</h1>
        <p>Por favor, espera mientras cargamos tu información.</p>
      </>
    );
  }

  if (!user) {
    return (
      <>
        <h1>Acceso Denegado</h1>
        <p>Por favor, inicia sesión para ver y editar tus ajustes.</p>
      </>
    );
  }

  return (
    <div className="ajustes-content">
      <h1>Ajustes de Usuario</h1>
      <p>Aquí puedes ver y actualizar la información de tu cuenta.</p>

      {/* Sección de Información Personal */}
      <div className="profile-section">
        <h2>Información Personal</h2>
        {/* {profileMessage && <p className="success-message">{profileMessage}</p>} */} {/* Eliminar */}
        {/* {profileError && <p className="error-message">{profileError}</p>} */} {/* Eliminar */}

        {isEditingProfile ? (
          <form onSubmit={handleProfileSubmit} className="profile-form">
            <div>
              <label htmlFor="firstName">Nombre:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={profileFormData.firstName}
                onChange={handleProfileChange}
                disabled={loadingProfile}
              />
            </div>
            <div>
              <label htmlFor="lastName">Apellido:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={profileFormData.lastName}
                onChange={handleProfileChange}
                disabled={loadingProfile}
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileFormData.email}
                onChange={handleProfileChange}
                disabled={loadingProfile}
              />
            </div>
            <button type="submit" disabled={loadingProfile}>
              {loadingProfile ? "Guardando..." : "Guardar Cambios"}
            </button>
            <button 
              type="button" 
              onClick={() => {
                setIsEditingProfile(false);
                if (user) {
                  setProfileFormData({
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    email: user.email || "",
                  });
                }
                // setProfileError(null); // Eliminar
                // setProfileMessage(null); // Eliminar
              }} 
              disabled={loadingProfile} 
              className="btn-secondary"
            >
              Cancelar
            </button>
          </form>
        ) : (
          <div className="profile-display">
            <p>
              <strong>Nombre:</strong> {user.firstName || 'No especificado'}
            </p>
            <p>
              <strong>Apellido:</strong> {user.lastName || 'No especificado'}
            </p>
            <p>
              <strong>Email:</strong> {user.email || 'No especificado'}
            </p>
            {user._id && (
              <p>
                <strong>ID de Usuario:</strong> {user._id}
              </p>
            )}
            <button onClick={() => setIsEditingProfile(true)} className="btn-edit-profile">
              Editar Perfil
            </button>
          </div>
        )}
      </div>

      {/* Sección para cambiar contraseña */}
      <div className="password-section">
        <h3>Cambiar Contraseña</h3>
        {/* {passwordMessage && <p className="success-message">{passwordMessage}</p>} */} {/* Eliminar */}
        {/* {passwordError && <p className="error-message">{passwordError}</p>} */} {/* Eliminar */}

        {!showPasswordForm ? (
          <button onClick={() => setShowPasswordForm(true)} className="btn-change-password">
            Cambiar Contraseña
          </button>
        ) : (
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <div>
              <label htmlFor="currentPassword">Contraseña Actual:</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordFormData.currentPassword}
                onChange={handlePasswordChange}
                disabled={loadingPassword}
              />
            </div>
            <div>
              <label htmlFor="newPassword">Nueva Contraseña:</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordFormData.newPassword}
                onChange={handlePasswordChange}
                disabled={loadingPassword}
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña:</label>
              <input
                type="password"
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={passwordFormData.confirmNewPassword}
                onChange={handlePasswordChange}
                disabled={loadingPassword}
              />
            </div>
            <button type="submit" disabled={loadingPassword}>
              {loadingPassword ? "Cambiando..." : "Cambiar Contraseña"}
            </button>
            <button 
              type="button" 
              onClick={() => {
                setShowPasswordForm(false);
                setPasswordFormData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
                // setPasswordError(null); // Eliminar
                // setPasswordMessage(null); // Eliminar
              }} 
              disabled={loadingPassword} 
              className="btn-secondary"
            >
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export { Ajustes };