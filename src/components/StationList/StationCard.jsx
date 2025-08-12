import React from 'react'

export default function StationCard({ station, index, onSelect, isActive }){
  const name = station.name || 'Sem nome'
  const country = station.country || 'Desconhecido'
  const favicon = station.favicon || '/src/styles/placeholder.png'

  return (
    <div className={'station-item' + (isActive ? ' active' : '')} onClick={()=> onSelect(index)} role="listitem">
      <img className="thumb" src={favicon} alt="icon" onError={(e)=> e.currentTarget.src='/src/styles/placeholder.png'} />
      <div className="station-info">
        <div className="station-name">{name}</div>
        <div className="station-country">{country}</div>
      </div>
      <div className="station-controls">
        <button className="btn-play" title={isActive ? 'Pausar' : 'Tocar'}>
          <span className="material-icons">{isActive ? 'pause' : 'play_arrow'}</span>
        </button>
      </div>
    </div>
  )
}
