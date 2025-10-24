export const MESSAGES = {
  USER: {
    NOT_FOUND: "Usuario no encontrado",
    DUPLICATE_EMAIL: "El correo ya está registrado",
    DUPLICATE_USERNAME: "El nombre de usuario ya está registrado",
    CREATED: "Cuenta creada correctamente",
    UPDATED: "Cuenta actualizada correctamente",
    DELETED: "Cuenta eliminada correctamente",
  },
  AUTH: {
    INVALID_TOKEN: "Token inválido o expirado",
    LOGIN_SUCCESS: "Inicio de sesión exitoso",
  },
  SERVER: {
    ERROR: "Ocurrió un error inesperado. Intente nuevamente.",
    VALIDATION_ERROR: "Solicitud inválida. Revise los datos enviados.",
  },
} as const;
