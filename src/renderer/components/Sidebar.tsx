export type NavView =
  | "bible"
  | "notes"
  | "sermons"
  | "plans"
  | "journal"
  | "study";

type SidebarProps = {
  activeView: NavView;
  onSelectView: (view: NavView) => void;
};

const navItems: { id: NavView; label: string }[] = [
  { id: "bible", label: "Bible" },
  { id: "study", label: "Study" },
  { id: "notes", label: "Notes" },
  { id: "sermons", label: "Sermons" },
  { id: "plans", label: "Plans" },
  { id: "journal", label: "Journal" }
];

const recentItems = [
  { title: "John 3", meta: "NIV · Today" },
  { title: "Romans 8", meta: "ESV · Yesterday" },
  { title: "Psalm 23", meta: "KJV · 2 days ago" }
];

const Sidebar = ({ activeView, onSelectView }: SidebarProps) => {
  return (
    <aside className="app-sidebar">
      <div className="app-brand">
        <h1 className="app-title">Bible Study</h1>
        <p className="app-subtitle">Offline study workspace</p>
      </div>
      <nav className="app-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={activeView === item.id ? "is-active" : ""}
            onClick={() => onSelectView(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="app-recent">
        <h4>Recent</h4>
        <ul>
          {recentItems.map((item) => (
            <li key={item.title}>
              <span className="app-recent__title">{item.title}</span>
              <span className="app-recent__meta">{item.meta}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
