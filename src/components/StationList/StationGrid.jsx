import React from 'react'
import StationCard from './StationCard'

export default function StationGrid({ stations = [], onSelect, currentIndex, onSearchChange }){
  return (
    <section className="painel estacoes-lista" aria-label="Lista de Estações">
      <header className="topo-botoes">
        <button id="view-stations-btn-list" className="botao-topo" aria-label="Voltar ao player">
          <span className="material-icons">remove</span>
        </button>

        <div className="search-bar">
          <span className="material-icons">search</span>
          <input type="text" id="search-input" placeholder="Pesquisar estação..." aria-label="Pesquisar estação" onChange={(e)=> onSearchChange && onSearchChange(e.target.value)} />
        </div>
      </header>

      <div className="stations-grid-wrapper">
        <div className="stations-grid" role="list">
          {stations.length === 0 && <div className="station-item station-empty">Nenhuma estação encontrada</div>}
          {stations.map((s, i) => (
            <StationCard key={s.stationuuid || i} station={s} index={i} onSelect={onSelect} isActive={i===currentIndex} isPlaying={false}/>
          ))}
        </div>
      </div>
    </section>
  )
}
