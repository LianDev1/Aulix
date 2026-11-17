import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Placeholder from './pages/Placeholder'
import ProtectedRoute from './components/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/inicio" element={<Inicio />} />
          {['mis-clases', 'tareas', 'calificaciones', 'calendario', 'mensajes', 'configuracion'].map((p) => (
            <Route key={p} path={`/${p}`} element={<Placeholder />} />
          ))}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
