import { useState } from 'react'

const initialsOf = (name = '') =>
  name.split(' ').filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || '?'

/** Avatar con imagen (si existe) o iniciales por defecto. tone: blue | green | purple */
export default function Avatar({ name, src, size = 36, tone = 'blue' }) {
  const [failed, setFailed] = useState(false)
  const style = { width: size, height: size, fontSize: Math.round(size * 0.36) }
  return (
    <span className={`avatar avatar--${tone}`} style={style} aria-hidden="true">
      {src && !failed ? <img src={src} alt="" onError={() => setFailed(true)} /> : initialsOf(name)}
    </span>
  )
}
