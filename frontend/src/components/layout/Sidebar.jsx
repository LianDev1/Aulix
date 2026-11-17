import { NavLink } from 'react-router-dom'
import { House, BookOpen, ClipboardList, ChartNoAxesCombined, CalendarDays, MessageCircle, Settings } from 'lucide-react'

const links = [
  { to: '/inicio', label: 'Inicio', icon: House },
  { to: '/mis-clases', label: 'Mis clases', icon: BookOpen },
  { to: '/tareas', label: 'Tareas', icon: ClipboardList, badge: 8 },
  { to: '/calificaciones', label: 'Calificaciones', icon: ChartNoAxesCombined },
  { to: '/calendario', label: 'Calendario', icon: CalendarDays },
  { to: '/mensajes', label: 'Mensajes', icon: MessageCircle, badge: 3 },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      <div className={`sidebar-overlay${open ? ' is-open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`sidebar${open ? ' is-open' : ''}`} aria-label="Navegación principal">
        <nav className="sidebar__menu">
          <p className="sidebar__title">ESPACIO DOCENTE</p>
          {links.map(({ to, label, icon: Icon, badge }) => (
            <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `sidebar__link${isActive ? ' is-active' : ''}`}>
              <Icon size={19} aria-hidden="true" />
              <span>{label}</span>
              {badge && <span className="sidebar__badge">{badge}</span>}
            </NavLink>
          ))}
        </nav>
        <hr className="sidebar__rule" />
        <div className="sidebar__spacer" />
        <NavLink to="/configuracion" onClick={onClose} className="sidebar__settings">
          <Settings size={18} aria-hidden="true" />
          Configuración
        </NavLink>
      </aside>
    </>
  )
}
