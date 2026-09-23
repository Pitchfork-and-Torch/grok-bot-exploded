import { useStudio } from '../store/useStudio'

export function AudioToggle() {
  const muted = useStudio((s) => s.muted)
  const toggle = useStudio((s) => s.toggleMuted)
  return (
    <button type="button" className="speaker mag" aria-pressed={!muted} onClick={toggle}>
      <span className="hair" aria-hidden="true" />
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 9h4l5-4v14l-5-4H4z" fill="none" stroke="currentColor" strokeWidth="1.2" />
        {muted ? <path d="M16 9l5 6M21 9l-5 6" stroke="currentColor" strokeWidth="1.2" /> : <path d="M16 9c1.5 1.2 1.5 4.8 0 6M18.5 7c2.2 2 2.2 8 0 10" fill="none" stroke="currentColor" strokeWidth="1.2" />}
      </svg>
      <span>{muted ? 'Sound off' : 'Sound on'}</span>
    </button>
  )
}
