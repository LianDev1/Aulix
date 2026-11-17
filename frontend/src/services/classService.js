// Datos SIMULADOS para el avance visual. Cuando exista el backend,
// reemplazar el cuerpo de estas funciones por llamadas con Axios/fetch
// (enviando el JWT en el header Authorization).

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export async function getResumenInicio() {
  await wait(700)
  return {
    clases: [
      { id: 1, nombre: 'Matemáticas', grupo: '3° A', ciclo: 2026, estudiantes: 28, tareasActivas: 3, tema: 'blue', icono: 'calculator', formula: 'x² + y²' },
      { id: 2, nombre: 'Ciencias', grupo: '3° A', ciclo: 2026, estudiantes: 28, tareasActivas: 2, tema: 'green', icono: 'flask', formula: 'H₂O' },
      { id: 3, nombre: 'Lengua y Literatura', grupo: '3° B', ciclo: 2026, estudiantes: 26, tareasActivas: 3, tema: 'purple', icono: 'book', formula: 'Aa' },
    ],
    actividad: [
      { id: 1, iniciales: 'AS', tema: 'green', texto: 'Ana Sofía García entregó “Ecuaciones de primer grado”.', detalle: 'Matemáticas · 3° A · Hace 40 min' },
    ],
  }
}
