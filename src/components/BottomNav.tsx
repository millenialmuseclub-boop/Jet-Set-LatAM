import { NavLink } from "react-router-dom";
import { Compass, MapPin, Sparkles } from "lucide-react";

const TABS = [
  { to: "/", label: "Discover", icon: Compass, end: true },
  { to: "/destinations", label: "Destinations", icon: MapPin },
  { to: "/plan", label: "Plan", icon: Sparkles },
];

export function BottomNav() {
  return (
    <nav
      aria-label="Main navigation"
      className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-cream/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                isActive ? "text-terracotta" : "text-ink-soft/60"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
