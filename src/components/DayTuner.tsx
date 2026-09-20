import { useState } from 'react'
import type { Itinerary, ItineraryDay } from '@/types'
import { getPlace } from '@/data'
import { adjustDay, dayAdjustments, dayAdvice } from '@/lib/dayAdjustments'
import { Sheet } from './Sheet'
export function DayTuner({itinerary,index,onChange,protectedIds=[]}:{itinerary:Itinerary;index:number;protectedIds?:string[];onChange:(itinerary:Itinerary)=>void}){
  const [open,setOpen]=useState(false)
  const [preview,setPreview]=useState<ReturnType<typeof adjustDay>|null>(null)
  const [undo,setUndo]=useState<{before:ItineraryDay;after:ItineraryDay}|null>(null)
  const [message,setMessage]=useState('')
  const day=itinerary.days[index]
  const advice=dayAdvice(day)
  const canUndo=undo&&JSON.stringify(day)===JSON.stringify(undo.after)
  return <div className="day-tuner">
    <button className="experience-action" onClick={()=>{setPreview(null);setOpen(true)}}>Make this day yours <span aria-hidden="true">＋</span></button>
    {canUndo&&<button className="experience-link" onClick={()=>{onChange({...itinerary,days:itinerary.days.map((d,i)=>i===index?undo.before:d)});setUndo(null);setMessage('Previous day restored.')}}>Undo day adjustment</button>}
    <p role="status" className="text-xs">{message}</p>
    <Sheet open={open} title={`Day ${day.day}, your way`} onClose={()=>setOpen(false)}>
      <p className="mb-4 text-sm text-ink-soft">One thoughtful change. Preview it before updating your trip.</p>
      {advice.map(note=><p key={note} className="day-advice">{note}</p>)}
      <div className="tuning-options">{dayAdjustments.map(([id,label])=><button key={id} onClick={()=>setPreview(adjustDay(itinerary,index,id,protectedIds))}>{label}</button>)}</div>
      {preview&&<section aria-label="Day adjustment preview" className="tuning-preview"><p role="status" className="mb-3 text-sm">{preview.message}</p><ol>{preview.day.activities.map(a=><li key={a.id}><span>{a.time}</span><div>{a.placeId?getPlace(a.placeId)?.name:a.label}{a.notes&&<p className="text-xs text-ink-soft">{a.notes}</p>}</div></li>)}</ol><button className="experience-action" disabled={!preview.changed} onClick={()=>{setUndo({before:{...day,activities:day.activities.map(a=>({...a}))},after:preview.day});onChange({...itinerary,days:itinerary.days.map((d,i)=>i===index?preview.day:d)});setOpen(false);setMessage('Day updated. You can undo this adjustment.')}}>Use this version</button></section>}
    </Sheet>
  </div>
}
