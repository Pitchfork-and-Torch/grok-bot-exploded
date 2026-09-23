import { DYES, PALETTES } from '../data/palettes'
import { useStudio } from '../store/useStudio'

export function ColorwayRail() {
  const dye = useStudio((s) => s.dye)
  const setDye = useStudio((s) => s.setDye)
  return (
    <div className="rail" role="radiogroup" aria-label="Colorway">
      {DYES.map((id) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={dye === id}
          aria-label={id}
          className={dye === id ? 'swatch on' : 'swatch'}
          style={{ background: PALETTES[id].swatch }}
          onClick={() => setDye(id)}
        />
      ))}
    </div>
  )
}
