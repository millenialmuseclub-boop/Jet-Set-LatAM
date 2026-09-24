import { MotionCanvas } from '@/components/MotionCanvas';
import { markAppReady, checkForOtaUpdate } from '@/lib/otaUpdater';
const AskJetSet = lazy(() => import('@/pages/AskJetSet').then(module => ({default:module.AskJetSet})));
const TripStory = lazy(() => import('@/pages/TripStory').then(module => ({default:module.TripStory})));
const TrailDetail = lazy(() => import('@/pages/TrailDetail').then(module => ({default:module.TrailDetail})));
const Carnival = lazy(() => import('@/pages/Carnival').then(module => ({default:module.Carnival})));
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { TopNav } from "@/components/TopNav";
import { Discover } from "@/pages/Discover";
const Destinations = lazy(() => import('@/pages/Destinations').then(module => ({default:module.Destinations})));
const DestinationDetail = lazy(() => import('@/pages/DestinationDetail').then(module => ({default:module.DestinationDetail})));
const PlanTrip = lazy(() => import('@/pages/PlanTrip').then(module => ({default:module.PlanTrip})));
const Saved = lazy(() => import('@/pages/Saved').then(module => ({default:module.Saved})));
const TripDetail = lazy(() => import('@/pages/TripDetail').then(module => ({default:module.TripDetail})));
const GuideDetail = lazy(() => import('@/pages/GuideDetail').then(module => ({default:module.GuideDetail})));
const Explore = lazy(() => import('@/pages/Explore').then(module => ({default:module.Explore})));
const InfoPage = lazy(() => import('@/pages/InfoPage').then(module => ({default:module.InfoPage})));
const About = lazy(() => import('@/pages/About').then(module => ({default:module.About})));

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <HashRouter>
        <ScrollReset />
        <TopNav />
        <MotionCanvas>
          <Suspense fallback={<div role="status" className="mx-auto max-w-xl px-5 py-16 text-sm">Opening your next chapter…</div>}>
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
            <Route path="/saved/trips/:tripId" element={<TripDetailRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <ConfirmBoot />
          </Suspense>
        </MotionCanvas>
        <BottomNav />
      </HashRouter>
    </MotionConfig>
  );
}
let confirmedBoot = false;
function ConfirmBoot() {
  useEffect(() => {
    if (confirmedBoot) return;
    confirmedBoot = true;
    void markAppReady().then(() => checkForOtaUpdate());
  }, []);
  return null;
}
function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function TripDetailRoute() {
  const { pathname } = useLocation();
  return <TripDetail key={pathname} />;
}
function DestinationRoute() {
  const { pathname } = useLocation();
  return <DestinationDetail key={pathname} />;
}
function GuideRoute() {
  const { pathname } = useLocation();
  return <GuideDetail key={pathname} />;
}
