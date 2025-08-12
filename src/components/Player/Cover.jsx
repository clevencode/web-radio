import React from 'react'
const placeholder = '/src/styles/placeholder.png'
export default function Cover({ src }){
  const url = src || placeholder
  return <div id="cover-art" className="capa" style={{backgroundImage:`url(${url})`, backgroundSize:'cover'}} aria-label="Imagem da estação"></div>
}
