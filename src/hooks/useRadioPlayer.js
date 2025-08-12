import { useEffect, useRef, useState } from 'react'
import { fetchStationsByCountry } from '../api/radioApi'

export default function useRadioPlayer() {
  const audioRef = useRef(new Audio())
  const [stations, setStations] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState('Brazil')

  useEffect(() => {
    // detecta pela linguagem do navegador (fallback para Brazil)
    const lang = navigator.language || 'pt-BR'
    const map = {
      'pt': 'Brazil','pt-BR':'Brazil',
      'en':'United States','en-US':'United States',
      'fr':'France','fr-FR':'France',
      'es':'Spain','es-ES':'Spain',
      'de':'Germany','de-DE':'Germany',
      'ht':'Haiti','ht-HT':'Haiti'
    }
    const c = map[lang] || map[lang.split('-')[0]] || 'Brazil'
    setCountry(c)
  }, [])

  useEffect(() => {
    let mounted = true
    async function load(){
      try{
        setLoading(true)
        const data = await fetchStationsByCountry(country)
        if(!mounted) return
        setStations(data)
        setCurrentIndex(0)
      }catch(e){
        console.error(e)
      }finally{
        setLoading(false)
      }
    }
    load()
    return () => mounted = false
  }, [country])

  useEffect(() => {
    const audio = audioRef.current
    audio.addEventListener('ended', handleNext)
    return () => {
      audio.removeEventListener('ended', handleNext)
      audio.pause()
    }
  }, [currentIndex, stations])

  function handlePlay(){
    const audio = audioRef.current
    if(!stations[currentIndex]) return
    audio.src = stations[currentIndex].url_resolved
    audio.play().then(() => setIsPlaying(true)).catch(()=> setIsPlaying(false))
  }

  function handlePause(){
    audioRef.current.pause()
    setIsPlaying(false)
  }

  function handleToggle(){
    if(isPlaying) handlePause(); else handlePlay()
  }

  function handleNext(){
    if(!stations.length) return
    setCurrentIndex((i) => {
      const next = (i + 1) % stations.length
      return next
    })
    setTimeout(() => { if(isPlaying) handlePlay() }, 200)
  }

  function handlePrev(){
    if(!stations.length) return
    setCurrentIndex((i) => {
      const prev = (i - 1 + stations.length) % stations.length
      return prev
    })
    setTimeout(() => { if(isPlaying) handlePlay() }, 200)
  }

  function selectIndex(index){
    if(index < 0 || index >= stations.length) return
    setCurrentIndex(index)
    setTimeout(() => handlePlay(), 50)
  }

  return {
    audioRef,
    stations,
    currentIndex,
    isPlaying,
    loading,
    country,
    setCountry,
    setStations,
    handlePlay,
    handlePause,
    handleToggle,
    handleNext,
    handlePrev,
    selectIndex
  }
}
