import { MotionCanvas } from '@/components/MotionCanvas';
import { AskJetSet } from '@/pages/AskJetSet';
import { TripStory } from '@/pages/TripStory';
import { TrailDetail } from '@/pages/TrailDetail';
import { Carnival } from '@/pages/Carnival';
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { TopNav } from "@/components/TopNav";
import { Discover } from "@/pages/Discover";
import { Destinations } from "@/pages/Destinations";
import { DestinationDetail } from "@/pages/DestinationDetail";
import { PlanTrip } from "@/pages/PlanTrip";
import { Saved } from "@/pages/Saved";
import { TripDetail } from "@/pages/TripDetail";
import { GuideDetail } from "@/pages/GuideDetail";
import { Explore } from "@/pages/Explore";
import { InfoPage } from "@/pages/InfoPage";
import { About } from "@/pages/About";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <ScrollReset />
        <TopNav />
        <MotionCanvas>
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destinations/:slug" element={<DestinationRoute />} />
            <Route path="/guides/:id" element={<GuideRoute />} />
            <Route
              path="/journal"
              element={<Navigate to="/explore" replace />}
            />
            <Route path="/trails/:id" element={<TrailDetail />} />
            <Route path="/carnival" element={<Carnival />} />
            <Route path="/ask" element={<AskJetSet />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/privacy" element={<InfoPage kind="privacy" />} />
            <Route
              path="/disclosure"
              element={<InfoPage kind="disclosure" />}
            />
            <Route path="/our-world" element={<InfoPage kind="world" />} />
            <Route path="/about" element={<About />} />
            <Route path="/plan" element={<PlanTrip />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/saved/trips/:tripId/story" element={<TripStory />} />
            <Route path="/saved/trips/:tripId" element={<TripDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MotionCanvas>
        <BottomNav />
      </HashRouter>
    </MotionConfig>
  );
}
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function DestinationRoute() {
  const { pathname } = useLocation();
  return <DestinationDetail key={pathname} />;
}
function GuideRoute() {
  const { pathname } = useLocation();
  return <GuideDetail key={pathname} />;
}
