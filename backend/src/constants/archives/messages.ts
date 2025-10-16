export const MESSAGES = {
  USER: {
    NOT_FOUND: "Usuario no encontrado",
    DUPLICATE_EMAIL: "El correo ya está registrado",
  },
  AUTH: {
    INVALID_TOKEN: "Token inválido o expirado",
    LOGIN_SUCCESS: "Inicio de sesión exitoso",
  },
  SERVER: {
    ERROR: "Ocurrió un error inesperado. Intente nuevamente.",
  },
} as const;
