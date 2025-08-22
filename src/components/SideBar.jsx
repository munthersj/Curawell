import { NavLink } from "react-router-dom";

export default function SideBar() {
  const topNavItems = [
    { label: "Home", path: "/home" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Appointments", path: "/appointments" },
    { label: "Documents", path: "/documents" },
    { label: "Bills", path: "/bills" },
    { label: "Points", path: "/points" },
  ];

  const bottomNavItems = [{ label: "Log out", path: "/logout" }];

  return (
    <aside className="fixed top-0 left-0 h-screen w-[225px] bg-white shadow-md p-6 flex flex-col justify-between z-20">
      <div>
        {/* Logo or Title */}
        <div className="flex items-center gap-2 text-3xl font-['Cairo'] text-[#972f6a] font-bold mb-10">
          <img
            src="src/assets/lo1go.png"
            alt="Curawell"
            className="w-10 h-10"
          />
          <span>Curawell</span>
        </div>

        {/* Navigation - Top */}
        <nav className="space-y-3">
          {topNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-1 rounded-md transition text-lg font-['Cairo'] ${
                  isActive
                    ? "bg-[#972f6a] text-white border border-[#972f6a]"
                    : "text-[#323842FF] hover:bg-[#f0f0f0]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Divider line */}
        <hr className="my-6 border-t border-gray-300" />

        {/* Navigation - Bottom */}
        <nav className="space-y-3">
          {bottomNavItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `block px-3 py-1 rounded-md transition text-lg font-['Cairo'] ${
                  isActive
                    ? "bg-[#972f6a] text-white border border-[#972f6a]"
                    : "text-[#323842FF] hover:bg-[#f0f0f0]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
