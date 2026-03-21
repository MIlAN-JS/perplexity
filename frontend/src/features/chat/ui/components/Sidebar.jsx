export default function Sidebar({ collapsed, setCollapsed , navItems , Icon , Icons , NAV_SECONDARY}) {

  

  return (
    <aside className="flex flex-col h-full w-[200px] flex-shrink-0"
      style={{ background: "#1a1a1a", borderRight: "1px solid #2a2a2a" }}>

      {/* Top nav items */}
      <div className="px-2 pt-3 pb-1">
        {navItems.map(item => (
          <button key={item.label}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors"
            style={{
              background: item.active ? "#2d2d2d" : "transparent",
              color: item.active ? "#f0f0f0" : "#999",
            }}
            onMouseEnter={e => { if (!item.active) e.currentTarget.style.background = "#242424"; }}
            onMouseLeave={e => { if (!item.active) e.currentTarget.style.background = "transparent"; }}
          >
            <Icon d={Icons[item.icon]} size={15} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="mx-3 my-1" style={{ borderTop: "1px solid #2a2a2a" }} />

      {/* Secondary nav */}
      <div className="px-2 flex-1">
        {NAV_SECONDARY.map(item => (
          <button key={item.label}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors"
            style={{ color: "#999" }}
            onMouseEnter={e => e.currentTarget.style.background = "#242424"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <Icon d={Icons[item.icon]} size={15} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* Recent section */}
      <div className="px-3 pb-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-between w-full text-xs px-1 py-1.5 mb-1"
          style={{ color: "#666" }}
        >
          <span className="uppercase tracking-wider font-medium">Recent</span>
          <Icon d={collapsed ? Icons.chevronDown : Icons.chevronUp} size={12} />
        </button>
        {!collapsed && (
         <>
          <p className="text-xs px-1 leading-relaxed" style={{ color: "#555" }}>
            Recent and active threads will appear here.
          </p>

          <div>
            
          </div>

         </>

           

        )}
      </div>

      <div className="mx-3 mb-2" style={{ borderTop: "1px solid #2a2a2a" }} />

      {/* Sign In */}
      <button
        className="flex items-center gap-3 mx-2 mb-3 px-3 py-2 rounded-lg text-sm"
        style={{ color: "#999" }}
        onMouseEnter={e => e.currentTarget.style.background = "#242424"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
          style={{ background: "#333", color: "#aaa" }}>
          <Icon d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" size={12} />
        </div>
        <span>Sign In</span>
        <Icon d="M9 18l6-6-6-6" size={13} className="ml-auto" />
      </button>
    </aside>
  );
}