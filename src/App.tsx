import { HashRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { BottomNav } from '@/components/BottomNav'
import { TopNav } from '@/components/TopNav'
import { Discover } from '@/pages/Discover'
import { Destinations } from '@/pages/Destinations'
import { DestinationDetail } from '@/pages/DestinationDetail'
import { PlanTrip } from '@/pages/PlanTrip'
import { Saved } from '@/pages/Saved'
import { TripDetail } from '@/pages/TripDetail'
import { GuideDetail } from '@/pages/GuideDetail'
import { Journal } from '@/pages/Journal'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <HashRouter>
      <TopNav />
      <div className="pt-safe mx-auto min-h-screen bg-parchment pb-24 md:pb-0">
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/guides/:id" element={<GuideDetail />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/plan" element={<PlanTrip />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/saved/trips/:tripId" element={<TripDetail />} />
        </Routes>
      </div>
      <BottomNav />
    </HashRouter>
    </MotionConfig>
  )
}
