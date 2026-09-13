// Real video, shot by Jordann at the actual Sambadrome — Carnaval 2025, Rio
// de Janeiro — and sent to us directly. Verified: the "CARNAVAL 2025" event
// banner is visible in the footage itself, alongside a genuine parade float
// and packed grandstands. Not stock, not archive footage, not staged.
// Source .mov (HEVC, 1080x1920) was transcoded to H.264 MP4 at 720x1280 for
// a reasonable mobile bundle size (8.5MB), audio kept (ambient
// parade/crowd sound) but muted by default in the UI — see
// MediaMoment.tsx. The poster frame is a single representative still
// pulled from the clip, not separate photography.
import carnaval2025SambadromeFloatVideo from './carnaval-2025-sambadrome-float.mp4'
import carnaval2025SambadromeFloatPoster from './carnaval-2025-sambadrome-float-poster.jpg'

export const rioVideos = {
  carnaval2025SambadromeFloat: {
    video: carnaval2025SambadromeFloatVideo,
    poster: carnaval2025SambadromeFloatPoster,
  },
}
