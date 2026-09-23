import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/inter-tight/latin-500.css'
import '@fontsource/inter-tight/latin-600.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import { App } from './App'
import { buildSchema } from './seo/schema'
import { useStudio, type Tier } from './store/useStudio'
import './styles/app.css'

function detectWebGL() {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return false
    const debug = gl.getExtension('WEBGL_debug_renderer_info')
    if (debug) {
      const renderer = String(gl.getParameter(debug.UNMASKED_RENDERER_WEBGL))
      if (/swiftshader|llvmpipe|microsoft basic render/i.test(renderer)) return false
    }
    return true
  } catch {
    return false
  }
}

function detectTier(): Tier {
  const nav = navigator as Navigator & { deviceMemory?: number }
  const mem = nav.deviceMemory ?? 8
  const cores = navigator.hardwareConcurrency ?? 8
  if (window.innerWidth < 720 || mem <= 4 || cores <= 4) return 'mid'
  return 'high'
}

const webgl = detectWebGL()
if (!webgl) document.documentElement.classList.add('no-webgl')
useStudio.getState().setWebgl(webgl)
useStudio.getState().setTier(webgl ? detectTier() : 'low')

const json = document.getElementById('orb-jsonld')
if (json) json.textContent = JSON.stringify(buildSchema())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
