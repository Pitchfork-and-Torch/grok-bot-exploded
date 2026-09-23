import { RAIL, SYSTEMS } from '../data/systems'
import { useStudio } from '../store/useStudio'

export function SystemLegend() {
  const hovered = useStudio((s) => s.hovered)
  const isolated = useStudio((s) => s.isolated)
  const isolate = useStudio((s) => s.isolate)
  const setHovered = useStudio((s) => s.setHovered)
  return (
    <nav className="legend" aria-label="Subsystems">
      {RAIL.map((id, index) => {
        const sys = SYSTEMS[id]
        const hot = hovered === id || isolated === id
        return (
          <button
            key={id}
            type="button"
            className={hot ? 'legend-row hot' : 'legend-row'}
            aria-pressed={isolated === id}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => {
              if (useStudio.getState().hovered === id) setHovered(null)
            }}
            onFocus={() => setHovered(id)}
            onClick={() => isolate(id)}
          >
            <span className="pip" aria-hidden="true" />
            <span className="idx">{String(index + 1).padStart(2, '0')}</span>
            <span className="legend-copy">
              <strong>{sys.code}</strong>
              <em>{sys.name}</em>
            </span>
          </button>
        )
      })}
    </nav>
  )
}
