import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Up360Landing from './Up360Landing'

const root = document.getElementById('root')
if (!root) throw new Error('root element not found')

// Minimal global reset so the self-contained landing renders edge-to-edge.
const reset = document.createElement('style')
reset.textContent = '*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%}'
document.head.appendChild(reset)

createRoot(root).render(
  <StrictMode>
    <Up360Landing />
  </StrictMode>,
)
