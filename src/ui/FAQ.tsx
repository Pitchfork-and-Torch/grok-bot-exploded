import { FAQ as ITEMS, HOWTO } from '../data/copy'

export function FAQ() {
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <h2 id="faq-title">Questions</h2>
      {ITEMS.map((item) => (
        <details key={item.q} open>
          <summary>{item.q}</summary>
          <p>{item.a}</p>
        </details>
      ))}
      <ol className="howto">
        {HOWTO.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </section>
  )
}
