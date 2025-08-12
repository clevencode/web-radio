// Funções para buscar estações via Radio Browser API
export async function fetchStationsByCountry(country = 'Brazil') {
  const url = `https://de1.api.radio-browser.info/json/stations/bycountry/${encodeURIComponent(country)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erro ao buscar estações');
  const data = await res.json();
  // Filtra estações com url https
  return data.filter(s => s.url_resolved && s.url_resolved.startsWith('https'));
}
