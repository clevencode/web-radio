import React, { useMemo, useState } from 'react'
import useRadioPlayer from '../hooks/useRadioPlayer'
import Player from '../components/Player/Player'
import StationGrid from '../components/StationList/StationGrid'
import MiniPlayer from '../components/MiniPlayer'
import Loader from '../components/Loader'

export default function Home(){
  const radio = useRadioPlayer()
  const [showList, setShowList] = useState(false)
  const [search, setSearch] = useState('')

  const filtered = useMemo(()=> {
    if(!search) return radio.stations
    return radio.stations.filter(s => (s.name || '').toLowerCase().includes(search.toLowerCase()))
  }, [radio.stations, search])

  const state = {
    ...radio,
    handleToggle: radio.handleToggle,
    handleNext: radio.handleNext,
    handlePrev: radio.handlePrev,
    isPlaying: radio.isPlaying
  }

  // attach simple handlers to switch panels
  React.useEffect(()=> {
    const btnToList = document.getElementById('view-stations-btn-player')
    const btnToPlayer = document.getElementById('view-stations-btn-list')
    function toList(){ setShowList(true) }
    function toPlayer(){ setShowList(false) }
    btnToList?.addEventListener('click', toList)
    btnToPlayer?.addEventListener('click', toPlayer)
    return ()=> {
      btnToList?.removeEventListener('click', toList)
      btnToPlayer?.removeEventListener('click', toPlayer)
    }
  }, [])

  return (
    <main className="container">
      {radio.loading && <Loader />}
      {!showList && <Player state={state} />}
      {showList && <StationGrid stations={filtered} onSelect={(i)=> radio.selectIndex(i)} currentIndex={radio.currentIndex} onSearchChange={setSearch} />}
      <MiniPlayer state={state} />
    </main>
  )
}
