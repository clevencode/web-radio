import React from 'react'

export default function MiniPlayer({ state }){
  const { stations, currentIndex, isPlaying, handleToggle } = state
  const current = stations[currentIndex] || {}
  return (
    <div id="mini-player" className={'mini-player ' + (isPlaying ? 'visible' : '')}>
      <button id="mini-toggle-btn" aria-label="Play/Pause" onClick={handleToggle}>
        <span className="material-icons" id="mini-toggle-icon">{isPlaying ? 'pause' : 'play_arrow'}</span>
      </button>
      <div className="mini-info">
        <div id="mini-station-name">{current.name || 'Estação atual'}</div>
        <div id="mini-station-country">{current.country || 'País'}</div>
      </div>
    </div>
  )
}
