import React from 'react'
import Controls from './Controls'
import Cover from './Cover'

export default function Player({ state }){
  const { stations, currentIndex } = state
  const current = stations[currentIndex] || {}
  return (
    <section className="painel player ativo" aria-label="Player de Música">
      <header className="topo-botoes">
        {/* botão para alternar painéis é tratado na página */}
        <button id="view-stations-btn-player" className="botao-topo" aria-label="Ver estações disponíveis">
          <span className="material-icons">add</span>
        </button>
      </header>

      <figure className="capa-container">
        <Cover src={current.favicon} />
      </figure>

      <div className="info-musica">
        <h1 id="artist-name">{current.name || '...'} </h1>
        <p id="song-name">{current.country || '...'}</p>
      </div>

      <Controls state={state} />
    </section>
  )
}
