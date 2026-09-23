import { CUTS, CUT_LABEL, type CutId } from '../data/palettes'
import { useStudio } from '../store/useStudio'

function Glyph({ cut }: { cut: CutId }) {
  const path: Record<CutId, string> = {
    blob: 'M8 3c4 0 6 3 6 6s-2 7-6 7-6-4-6-7 2-6 6-6z',
    pebble: 'M8 4c3 0 5 2 5 5s-2 5-5 6-5-3-5-6 2-5 5-5z',
    squircle: 'M4 4h8v8H4z',
    tablet: 'M3 6h10v4H3z',
    wedge: 'M3 12 L13 4 L13 12 Z',
    hex: 'M8 2l5 3v6l-5 3-5-3V5z',
    cloud: 'M5 10c-2 0-3-2-2-3s2-1 3 0c0-2 3-3 4-1 2-1 3 1 3 2 1 0 2 2 1 3H5z',
    teardrop: 'M8 2c3 3 4 5 4 7a4 4 0 1 1-8 0c0-2 1-4 4-7z',
  }
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d={path[cut]} fill="currentColor" />
    </svg>
  )
}

export function CutPicker() {
  const cut = useStudio((s) => s.cut)
  const setCut = useStudio((s) => s.setCut)
  return (
    <div className="rail cuts" role="radiogroup" aria-label="Hull cut">
      {CUTS.map((id) => (
        <button
          key={id}
          type="button"
          role="radio"
          aria-checked={cut === id}
          aria-label={CUT_LABEL[id]}
          className={cut === id ? 'cut on' : 'cut'}
          onClick={() => setCut(id)}
        >
          <Glyph cut={id} />
        </button>
      ))}
    </div>
  )
}
