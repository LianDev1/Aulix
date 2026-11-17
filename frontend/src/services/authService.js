// Servicio TEMPORAL de autenticación (DummyJSON).
// Cuando el backend de Spring Boot esté listo, solo hay que cambiar
// API_URL y el cuerpo de la petición; el resto de la app no se toca.

const API_URL = 'https://dummyjson.com/auth/login'

export class AuthError extends Error {
  constructor(message, type = 'credentials') {
    super(message)
    this.type = type // 'credentials' | 'network' | 'server'
  }
}

/**
 * DummyJSON autentica con "username", no con correo.
 * Mientras tanto usamos la parte local del correo como username
 * (ej. emilys@colegio.edu -> emilys).
 */
const emailToUsername = (email) => email.trim().split('@')[0]

export async function login({ email, password }) {
  let response
  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: emailToUsername(email),
        password,
        expiresInMins: 60,
      }),
    })
  } catch {
    throw new AuthError(
      'No pudimos conectar con el servidor. Revisa tu conexión a internet e inténtalo de nuevo.',
      'network',
    )
  }

  if (response.status === 400 || response.status === 401) {
    throw new AuthError('Correo o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.')
  }
  if (!response.ok) {
    throw new AuthError('El servidor tuvo un problema. Inténtalo de nuevo en unos minutos.', 'server')
  }

  const data = await response.json()
  return {
    token: data.accessToken ?? data.token,
    user: {
      id: data.id,
      nombre: `${data.firstName ?? ''} ${data.lastName ?? ''}`.trim() || data.username,
      correo: data.email,
      avatar: data.image,
    },
  }
}
