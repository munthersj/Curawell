import React from "react";

const PRIMARY = "#972f6a";

const NavItem = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={[
      "w-full flex items-center gap-3 rounded-xl px-4 py-3 text-left transition",
      active
        ? "text-white shadow-sm"
        : "text-gray-600 hover:bg-gray-100",
    ].join(" ")}
    style={active ? { background: PRIMARY } : {}}
  >
    <span className="inline-flex h-5 w-5 items-center justify-center">
      {icon}
    </span>
    <span className="font-medium">{label}</span>
  </button>
);

export default function SideBar({ activeKey, onChange }) {
  const topItems = [
    // { key: "lab", label: "Lab Reception", icon: <LogoIcon /> },
    { key: "users", label: "User Management", icon: <UsersIcon /> },
    { key: "radiology", label: "Radiology", icon: <ImageIcon /> },
  ];

  const bottomItems = [{ key: "settings", label: "Settings", icon: <SettingsIcon /> }];

  return (
    <aside className="h-screen w-72 rounded-3xl bg-white p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)]">
      <div className="mb-8 flex items-center gap-2">
        <BrandMark />
        <span className="text-2xl font-extrabold" style={{ color: PRIMARY }}>
          Curawell
        </span>
      </div>

      <nav className="space-y-2">
        <NavItem
          active={activeKey === "lab"}
          icon={<HomeIcon />}
          label="Lab Reception"
          onClick={() => onChange?.("lab")}
        />
        <NavItem
          active={activeKey === "users"}
          icon={<UsersIcon />}
          label="User Management"
          onClick={() => onChange?.("users")}
        />
        <NavItem
          active={activeKey === "radiology"}
          icon={<ImageIcon />}
          label="Radiology"
          onClick={() => onChange?.("radiology")}
        />
      </nav>

      <div className="my-8 h-px w-full bg-gray-200" />

      <nav className="space-y-2">
        <NavItem
          active={activeKey === "settings"}
          icon={<SettingsIcon />}
          label="Settings"
          onClick={() => onChange?.("settings")}
        />
      </nav>

      <div className="mt-auto" />
    </aside>
  );
}

/* Icons */
const BrandMark = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M7 3c2 3-1 5-3 6 3 1 5 5 2 7 4 0 6-3 6-6S11 3 7 3Z" fill={PRIMARY} />
    <path d="M17 3c-2 3 1 5 3 6-3 1-5 5-2 7-4 0-6-3-6-6s2-7 6-7Z" fill={PRIMARY} opacity=".7" />
  </svg>
);

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M3 10.5l9-7 9 7V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M16 21v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="10" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M20 21v-1a3.5 3.5 0 0 0-3-3.45" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M17 10a3 3 0 1 0 0-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const ImageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M6 15l3-3 2 2 4-4 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="9" cy="8" r="1.5" fill="currentColor"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M19.4 15a7.8 7.8 0 0 0 .1-6l1.5-1.3-2-3.4-1.9.6a7.9 7.9 0 0 0-5-.2L10 2h-4l-.3 2.7a7.8 7.8 0 0 0-3.3 3l-2 0.6 1 3.8 2-.1a7.9 7.9 0 0 0 2.8 3.6L6 19l3.4 1.3 1-1.6a7.9 7.9 0 0 0 3.8-.1l1.3 1.4 3.2-2-1-1.7Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
