// Real video, shot by Jordann on her own Cartagena trip and sent to us
// directly — not stock, not archive footage. Source .mov files (HEVC,
// 1080x1920) were transcoded to H.264 MP4 at 720x1280 for a reasonable
// mobile bundle size, audio kept (ambient street/plaza sound) but muted by
// default in the UI — see MediaMoment.tsx. Poster frames are single
// representative stills pulled from each clip, not separate photography.
//
// NOTE: this is explicitly NOT Rio Carnival footage. The dance clip below
// shows a folkloric dance procession in traditional white dress in
// Cartagena's Walled City — it is not dated or confirmed as any specific
// named event, and is captioned factually rather than as "Carnival"
// anywhere in this app. Real Rio Carnival footage is pending from Jordann.
import plazaTerraceEveningVideo from './plaza-terrace-evening.mp4'
import plazaTerraceEveningPoster from './plaza-terrace-evening-poster.jpg'
import palenqueraParadeStreetVideo from './palenquera-parade-street.mp4'
import palenqueraParadeStreetPoster from './palenquera-parade-street-poster.jpg'

export const cartagenaVideos = {
  plazaTerraceEvening: {
    video: plazaTerraceEveningVideo,
    poster: plazaTerraceEveningPoster,
  },
  palenqueraParadeStreet: {
    video: palenqueraParadeStreetVideo,
    poster: palenqueraParadeStreetPoster,
  },
}
