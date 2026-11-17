import { useLocation } from 'react-router-dom'

// Marcador para secciones que se construyen en las siguientes entregas.
export default function Placeholder() {
  const { pathname } = useLocation()
  const name = pathname.replace('/', '').replace('-', ' ')
  return (
    <div className="page-head">
      <div>
        <h1 className="page-title" style={{ textTransform: 'capitalize' }}>{name}</h1>
        <p className="page-subtitle">Esta sección estará disponible en una próxima entrega.</p>
      </div>
    </div>
  )
}
