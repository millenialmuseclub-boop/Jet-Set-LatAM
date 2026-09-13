import type { TripContext, Itinerary, StyleHandoff } from '@/types'
import { deriveWardrobeMoments } from './luxeJetterCopy'
import { getPlace } from '@/data'
export function buildStyleHandoff(context: TripContext, itinerary: Itinerary): StyleHandoff {
 const { destinationId,destinationName,country,days,startDate,endDate,companions,interests,pace,style } = context
 return {version:1,source:'jet-set-latam',trip:{destinationId,destinationName,country,days,startDate,endDate,companions,interests,pace,style},occasions:deriveWardrobeMoments(itinerary),moments:itinerary.days.map(d=>({day:d.day,theme:d.theme,activities:d.activities.map(a=>a.placeId?getPlace(a.placeId)?.name||a.label:a.label)}))}
}
export function formatStyleBrief(h: StyleHandoff) { return [h.trip.destinationName+' · '+h.trip.country,h.trip.days+' days',h.occasions.join(' · '),...h.moments.map(d=>'Day '+d.day+': '+d.theme+' — '+d.activities.join(', '))].join('\n') }
