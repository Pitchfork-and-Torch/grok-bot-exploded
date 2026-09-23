import { ESSAY } from '../data/copy'

export function Essay() {
  return (
    <article id="essay" className="essay">
      <p className="kicker">Plate 00</p>
      <h2>How an Orb thinks</h2>
      <p className="lede">{ESSAY.lede}</p>
      {ESSAY.paragraphs.map((paragraph) => (
        <p key={paragraph.slice(0, 24)}>{paragraph}</p>
      ))}
      <ul className="key-takeaways">
        {ESSAY.takeaways.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  )
}
