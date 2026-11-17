import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, BookOpen, CalendarDays, Calculator, CircleCheck, Ellipsis, FlaskConical, ImageIcon, RefreshCw, WifiOff } from 'lucide-react'
import Avatar from '../components/Avatar'
import { useAuth } from '../context/AuthContext'
import { getResumenInicio } from '../services/classService'
import '../styles/inicio.css'

const icons = { calculator: Calculator, flask: FlaskConical, book: BookOpen }

function saludo() {
  const h = new Date().getHours()
  return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'
}
function fechaHoy() {
  const f = new Intl.DateTimeFormat('es-MX', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())
  return f.charAt(0).toUpperCase() + f.slice(1)
}

function ClassCard({ clase }) {
  const Icon = icons[clase.icono]
  return (
    <article className={`class-card class-card--${clase.tema}`}>
      <div className="class-card__cover">
        <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
        <span className="class-card__formula">{clase.formula}</span>
      </div>
      <div className="class-card__info">
        <div className="class-card__row">
          <h3 className="class-card__name">{clase.nombre}</h3>
          <button type="button" className="icon-btn icon-btn--sm" aria-label={`Opciones de ${clase.nombre}`}><Ellipsis size={18} /></button>
        </div>
        <p>{clase.grupo} · Ciclo {clase.ciclo}</p>
        <p>{clase.estudiantes} estudiantes</p>
        <div className="class-card__footer">
          <span>{clase.tareasActivas} tareas activas</span>
          <Link to="/mis-clases" aria-label={`Entrar a ${clase.nombre}`}><ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </article>
  )
}

function Skeleton() {
  return (
    <div aria-busy="true" aria-label="Cargando clases">
      <div className="classes">
        {[1, 2, 3].map((i) => <div key={i} className="skeleton skeleton--card" />)}
      </div>
      <div className="skeleton skeleton--feed" />
    </div>
  )
}

export default function Inicio() {
  const { user } = useAuth()
  const [state, setState] = useState({ status: 'loading', data: null })
  const [post, setPost] = useState('')

  const load = useCallback(async () => {
    setState({ status: 'loading', data: null })
    try {
      setState({ status: 'ready', data: await getResumenInicio() })
    } catch {
      setState({ status: 'error', data: null })
    }
  }, [])
  useEffect(() => { load() }, [load])

  const firstName = user?.nombre?.split(' ')[0] ?? ''

  return (
    <>
      <div className="page-head">
        <div>
          <h1 className="page-title">¡{saludo()}, {firstName}!</h1>
          <p className="page-subtitle">Cada día es una nueva oportunidad para inspirar.</p>
        </div>
        <p className="page-date"><CalendarDays size={17} aria-hidden="true" />{fechaHoy()}</p>
      </div>

      {state.status === 'loading' && <Skeleton />}

      {state.status === 'error' && (
        <div className="alert alert--error" role="alert">
          <WifiOff size={18} />
          <span>No pudimos cargar tu información. Revisa tu conexión e inténtalo de nuevo.</span>
          <button type="button" className="btn btn--ghost btn--sm" onClick={load}><RefreshCw size={14} /> Reintentar</button>
        </div>
      )}

      {state.status === 'ready' && (
        <>
          <section>
            <div className="section-head">
              <h2>Mis clases</h2>
              <Link to="/mis-clases">Ver todas →</Link>
            </div>
            <div className="classes">
              {state.data.clases.map((c) => <ClassCard key={c.id} clase={c} />)}
            </div>
          </section>

          <section>
            <div className="section-head">
              <h2>Actividad reciente</h2>
              <Link to="/tareas">Ver actividad →</Link>
            </div>
            <div className="feed">
              <div className="feed__composer">
                <Avatar name={user?.nombre} src={user?.avatar} />
                <input
                  className="feed__input"
                  type="text"
                  placeholder="¿Qué quieres compartir con tu clase?"
                  aria-label="Escribe una publicación"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                />
                <button type="button" className="icon-btn feed__image" aria-label="Adjuntar imagen"><ImageIcon size={40} strokeWidth={1.3} /></button>
              </div>
              {state.data.actividad.map((a) => (
                <div key={a.id} className="feed__item">
                  <Avatar name={a.iniciales} tone={a.tema} />
                  <div className="feed__text">
                    <p className="feed__title">{a.texto}</p>
                    <p className="feed__detail">{a.detalle}</p>
                  </div>
                  <CircleCheck size={34} strokeWidth={1.3} className="feed__check" aria-hidden="true" />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  )
}
