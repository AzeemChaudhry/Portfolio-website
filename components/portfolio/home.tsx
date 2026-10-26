"use client"

import { useEffect, useRef, useState } from "react"
import "./portfolio.css"
import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  alsoBuilt,
  assistantLinks,
  beliefs,
  buildPrompt,
  intents,
  path,
  projects,
  tools,
  type Diagram,
  type IntentId,
} from "./data"

// Pinned sections: the stage is one screen tall (capped), and each item gets
// STEP of scroll before the next one takes focus. Keep in sync with
// --pf-stage / --pf-step in portfolio.css.
const STAGE_MAX = 1000
const pinHeight = (n: number) => `calc(var(--pf-stage) + ${n} * var(--pf-step))`

function focusIndex(el: HTMLElement | null, n: number): number | null {
  if (!el) return null
  const r = el.getBoundingClientRect()
  const span = r.height - Math.min(window.innerHeight, STAGE_MAX)
  if (span <= 0) return null
  const t = Math.max(0, Math.min(0.9999, -r.top / span))
  // Small lead so the next item takes focus slightly before its midpoint.
  return Math.min(n - 1, Math.floor(t * n + 0.15))
}

function scrollToItem(el: HTMLElement | null, n: number, i: number) {
  if (!el) return
  const r = el.getBoundingClientRect()
  const span = r.height - Math.min(window.innerHeight, STAGE_MAX)
  window.scrollBy({ top: r.top + ((i + 0.5) / n) * span, behavior: "smooth" })
}

const pad = (n: number) => String(n).padStart(2, "0")

const WAVE: { h: number; d: number; peak?: boolean }[] = [
  { h: 12, d: 0 }, { h: 20, d: 0.1 }, { h: 16, d: 0.2 }, { h: 28, d: 0.3 },
  { h: 18, d: 0.4 }, { h: 10, d: 0.5 }, { h: 24, d: 0.7, peak: true }, { h: 40, d: 0.8, peak: true },
  { h: 52, d: 0.9, peak: true }, { h: 36, d: 1, peak: true }, { h: 46, d: 1.1, peak: true }, { h: 22, d: 1.2, peak: true },
  { h: 12, d: 1.3 }, { h: 8, d: 1.4 }, { h: 14, d: 1.5 }, { h: 6, d: 0.35 },
]

function ProjectDiagram({ diagram }: { diagram: Diagram }) {
  if (diagram.kind === "federated") {
    return (
      <div className="pf-fed" aria-label="Federated training round">
        {["A", "B", "C"].map((c, i) => (
          <div key={c} className="pf-client" style={{ animationDelay: `${i * 0.25}s` }}>
            <span>client {c}</span>
            <span>trains locally</span>
          </div>
        ))}
        <div className="pf-server">
          <span>server</span>
          <span>FedAvg</span>
        </div>
      </div>
    )
  }
  if (diagram.kind === "wave") {
    return (
      <div className="pf-wave" aria-hidden="true">
        {WAVE.map((b, i) => (
          <span key={i} className={b.peak ? "is-peak" : undefined} style={{ height: b.h, animationDelay: `${b.d}s` }} />
        ))}
      </div>
    )
  }
  const n = diagram.steps.length
  return (
    <div className="pf-pipe" aria-label="How it works">
      {diagram.steps.map((s, j) => (
        <span key={s} className="pf-pipe-item">
          <span className="pf-step" style={{ animationDuration: `${n * 1.1}s`, animationDelay: `${j * 1.1}s` }}>
            {s}
          </span>
          {j < n - 1 && (
            <span className="pf-pipe-arrow" aria-hidden="true">
              →
            </span>
          )}
        </span>
      ))}
    </div>
  )
}

export default function PortfolioHome() {
  const stanceRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLDivElement>(null)
  const [belief, setBelief] = useState(0)
  const [proj, setProj] = useState(0)
  const [intent, setIntent] = useState<IntentId>("hiring")

  useEffect(() => {
    let ticking = false
    const measure = () => {
      ticking = false
      const b = focusIndex(stanceRef.current, beliefs.length)
      if (b !== null) setBelief(b)
      const p = focusIndex(workRef.current, projects.length)
      if (p !== null) setProj(p)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(measure)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  const prompt = buildPrompt(intent)
  const assistants = assistantLinks(prompt)

  return (
    <main className="pf">
      <div className="pf-progress" aria-hidden="true" />

      <header className="pf-rise pf-d1" style={{ borderBottom: "1px solid var(--pf-line)" }}>
        <nav className="pf-wrap pf-nav" aria-label="Primary">
          <a href="#top" className="pf-brand">
            Azeem Chaudhry
          </a>
          <div className="pf-navlinks">
            <a href="#stance">
              <span className="pf-u">stance</span>
            </a>
            <a href="#work">
              <span className="pf-u">work</span>
            </a>
            <a href="#path">
              <span className="pf-u">path</span>
            </a>
            <a href="#ask" className="pf-accent">
              <span className="pf-u">ask an AI about me →</span>
            </a>
          </div>
        </nav>
      </header>

      <section id="top" className="pf-wrap pf-hero">
        <p className="pf-kicker pf-rise pf-d1">Muhammad Azeem Chaudhry · AI engineer · Islamabad</p>
        <h1 className="pf-h1">
          <span className="pf-line">
            <span>Most AI dies at the</span>
          </span>
          <span className="pf-line">
            <span>edge of the notebook.</span>
          </span>
          <span className="pf-line">
            <span>I work on what comes after.</span>
          </span>
        </h1>
        <p className="pf-lede pf-rise pf-d3">
          I build RAG platforms, multi-agent systems and the guardrails around them, and I care more about whether they
          hold up than how they look in a demo.
        </p>
        <div className="pf-ctas pf-rise pf-d4">
          <a className="pf-pill pf-pill-solid" href="#work">
            See the work
          </a>
          <a className="pf-pill pf-pill-ghost" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>
      </section>
      <div className="pf-hint pf-rise pf-d5" aria-hidden="true">
        <span>scroll ↓</span>
      </div>

      {/* Beliefs: pinned, one in focus at a time */}
      <section id="stance" ref={stanceRef} className="pf-rule pf-pin" style={{ height: pinHeight(beliefs.length) }}>
        <div className="pf-stage">
          <div className="pf-stage-head">
            <h2 className="pf-stage-title">Where I stand, while everyone is talking about AI</h2>
            <span className="pf-count">
              {pad(belief + 1)} / {pad(beliefs.length)}
            </span>
          </div>
          <div className="pf-beliefs">
            {beliefs.map((b, i) => (
              <div key={b.title} className={`pf-belief${i === belief ? " is-on" : ""}`}>
                <div className="pf-belief-row">
                  <span className="pf-num">{pad(i + 1)}</span>
                  <span className="pf-belief-title">{b.title}</span>
                </div>
                <div className="pf-collapse">
                  <div>
                    <p className="pf-belief-body">{b.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work: pinned stage, the project in focus expands */}
      <section id="work" className="pf-rule pf-work">
        <div ref={workRef} className="pf-pin" style={{ height: pinHeight(projects.length) }}>
          <div className="pf-stage">
            <div className="pf-stage-head">
              <h2 className="pf-stage-title">Every project started as a question, not a stack.</h2>
              <span className="pf-count">
                {pad(proj + 1)} / {pad(projects.length)}
              </span>
            </div>
            <div className="pf-stagegrid">
              <nav className="pf-rail" aria-label="Projects">
                {projects.map((p, i) => (
                  <button
                    key={p.title}
                    type="button"
                    className={i === proj ? "is-on" : undefined}
                    aria-current={i === proj ? "step" : undefined}
                    aria-label={p.title}
                    onClick={() => scrollToItem(workRef.current, projects.length, i)}
                  >
                    <span className="pf-rail-num">{pad(i + 1)}</span>
                    <span className="pf-rail-text">
                      <span className="pf-rail-title">{p.title}</span>
                      <span className={`pf-collapse${i === proj ? " is-on" : ""}`}>
                        <span className="pf-rail-tag">{p.tag}</span>
                      </span>
                    </span>
                  </button>
                ))}
              </nav>

              <div className="pf-panels">
                {projects.map((p, i) => (
                  <article
                    key={p.title}
                    aria-hidden={i !== proj}
                    className={`pf-panel${i === proj ? " is-on" : i < proj ? " is-before" : ""}`}
                  >
                    <div className="pf-panel-meta">
                      <span>{p.where}</span>
                      <span>{p.title}</span>
                    </div>
                    <h3>{p.question}</h3>
                    <ProjectDiagram diagram={p.diagram} />
                    <p className="pf-story">{p.story}</p>
                    <div className="pf-panel-foot">
                      {p.stat && (
                        <div className="pf-stat">
                          <strong>{p.stat}</strong>
                          <span>{p.statLabel}</span>
                        </div>
                      )}
                      <p className="pf-lesson">
                        <strong>What it taught me:</strong> {p.lesson}
                      </p>
                      <a className="pf-source" href={p.link} target="_blank" rel="noopener noreferrer">
                        <span className="pf-u">source ↗</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="pf-wrap pf-also">
          <span>also built</span>
          {alsoBuilt.map((a) => (
            <span key={a} className="pf-chip">
              {a}
            </span>
          ))}
        </div>
      </section>

      <section id="path" className="pf-rule">
        <div className="pf-wrap pf-path">
          <h2 className="pf-h2 pf-reveal">The path so far, short and honest</h2>
          <div>
            <div className="pf-draw" aria-hidden="true" />
            <ol className="pf-timeline">
              {path.map((s) => (
                <li key={s.where} className={`pf-reveal${s.current ? " is-current" : ""}`}>
                  <span className="pf-when">{s.when}</span>
                  <strong>{s.where}</strong>
                  <span className="pf-role">{s.role}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div className="pf-tickerwrap" aria-label="Toolbox">
          <div className="pf-ticker">
            <span>
              {tools.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </span>
            <span aria-hidden="true">
              {tools.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </span>
          </div>
        </div>
      </section>

      <section id="ask" className="pf-dark">
        <div className="pf-wrap pf-ask">
          <h2 className="pf-reveal">Don’t take my word for it. Ask an AI.</h2>
          <div className="pf-intents pf-reveal" role="group" aria-label="Why are you here?">
            {intents.map((it) => (
              <button
                key={it.id}
                type="button"
                aria-pressed={it.id === intent}
                onClick={() => setIntent(it.id)}
              >
                {it.label}
              </button>
            ))}
          </div>
          <div className="pf-cards pf-reveal">
            {assistants.map((a) => (
              <a key={a.name} className="pf-card" href={a.href} target="_blank" rel="noopener noreferrer">
                <span className="pf-card-top">
                  <span>{a.vendor}</span>
                  <span className="pf-arrow" aria-hidden="true">
                    ↗
                  </span>
                </span>
                <strong>{a.name}</strong>
              </a>
            ))}
          </div>
          <p className="pf-prompt pf-reveal">prompt › {prompt}</p>
        </div>
      </section>

      <footer className="pf-dark pf-footer">
        <div className="pf-wrap pf-footer-inner">
          <div className="pf-footer-row pf-reveal">
            <p>Or skip the middleman. I read every message.</p>
            <div className="pf-footer-links">
              <a href={`mailto:${EMAIL}`}>
                <span className="pf-u">email</span>
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
                <span className="pf-u">linkedin ↗</span>
              </a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                <span className="pf-u">github ↗</span>
              </a>
            </div>
          </div>
          <p className="pf-copy">© {new Date().getFullYear()} Muhammad Azeem Chaudhry · built by hand, questioned by machines</p>
        </div>
      </footer>
    </main>
  )
}
