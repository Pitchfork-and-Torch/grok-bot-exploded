import { useState } from 'react'
import { SEGMENTS, specById } from '../data/systems'
import { useStudio } from '../store/useStudio'

export function SpecDrawer() {
  const isolated = useStudio((s) => s.isolated)
  const hovered = useStudio((s) => s.hovered)
  const id = isolated || hovered
  const spec = specById(id)
  const [copied, setCopied] = useState(false)
  const open = Boolean(spec)
  const unions = spec && 'id' in spec && (spec.id === 'veins' || spec.id === 'bus')
    ? SEGMENTS.filter((seg) => (spec.id === 'veins' ? seg.kind === 'vein' : seg.kind === 'bus'))
    : []
  const title = spec && 'title' in spec ? spec.title : spec?.name
  return (
    <aside className={open ? 'drawer open' : 'drawer'} aria-label="Specification">
      {spec ? (
        <>
          <p className="drawer-kicker">
            <span className="led" aria-hidden="true" />
            {spec.code}
          </p>
          <h2>{title}</h2>
          <p className="fn">{spec.fn}</p>
          <button
            type="button"
            className="copy"
            onClick={() => {
              const done = () => {
                setCopied(true)
                window.setTimeout(() => setCopied(false), 700)
              }
              if (!navigator.clipboard) return
              void navigator.clipboard.writeText(spec.code).then(done).catch(() => undefined)
            }}
          >
            <span className={copied ? 'tick on' : 'tick'} aria-hidden="true" />
            {copied ? 'Copied' : 'Copy part number'}
          </button>
          <dl>
            <div><dt>Mass</dt><dd>{spec.mass}</dd></div>
            <div><dt>Power</dt><dd>{spec.power}</dd></div>
            <div><dt>Temp</dt><dd>{spec.temp}</dd></div>
          </dl>
          <ul className="chips">
            {spec.materials.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <p className="poem">{spec.poem}</p>
          {unions.length > 0 ? (
            <ul className="unions">
              {unions.map((seg) => (
                <li key={seg.id}>{seg.union}: {seg.from} to {seg.to}</li>
              ))}
            </ul>
          ) : null}
        </>
      ) : (
        <p className="empty">Select a subsystem. The plate will hold still while you read.</p>
      )}
    </aside>
  )
}
