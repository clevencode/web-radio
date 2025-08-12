import React from 'react'

export default function Controls({ state }){
  const { handlePrev, handleToggle, handleNext, isPlaying } = state
  return (
    <nav className="controles" aria-label="Controles de reprodução">
      <button id="prev-btn" aria-label="Anterior" onClick={handlePrev}><span className="material-icons">skip_previous</span></button>
      <button id="play-pause-btn" aria-label="Tocar/Pausar" onClick={handleToggle}>
        <span className="material-icons">{isPlaying ? 'pause' : 'play_arrow'}</span>
      </button>
      <button id="next-btn" aria-label="Próxima" onClick={handleNext}><span className="material-icons">skip_next</span></button>
    </nav>
  )
}
