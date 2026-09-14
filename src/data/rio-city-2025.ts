import records from './rio-city-2025.json';
const images=import.meta.glob('../assets/rio-city-2025/*.webp',{eager:true,query:'?url',import:'default'}) as Record<string,string>;
export const rioCity2025=records.map(p=>({...p,src:images['../assets/rio-city-2025/'+p.file]}));
