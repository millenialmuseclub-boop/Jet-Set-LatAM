import { NavLink } from "react-router-dom";
import { Compass, MapPin, BookOpen, Route } from "lucide-react";

const TABS = [
  { to: "/", label: "Discover", icon: Compass, end: true },
  { to: "/destinations", label: "Destinations", icon: MapPin },
  { to: "/explore", label: "Journal", icon: BookOpen },
  { to: "/plan", label: "Plan", icon: Route },
];

export function BottomNav() {
  return (
    <nav aria-label="Main navigation" className="editorial-bottom-nav pb-safe fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto grid max-w-lg grid-cols-4 px-3">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={({ isActive }) => `editorial-nav-link ${isActive ? 'is-current' : ''}`}>
            <span className="editorial-nav-icon"><Icon size={21} strokeWidth={1.65} aria-hidden="true"/></span>
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
