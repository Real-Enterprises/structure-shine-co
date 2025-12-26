import { Link } from "react-router-dom";
import { LayoutDashboard, FolderOpen, MessageSquare, Settings, Users, Image, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: FolderOpen, label: "Projects", count: 12 },
    { icon: MessageSquare, label: "Testimonials", count: 8 },
    { icon: Image, label: "Media", count: 45 },
    { icon: Users, label: "Inquiries", count: 3 },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded flex items-center justify-center">
              <span className="font-display font-bold text-sidebar-primary-foreground">R</span>
            </div>
            <span className="font-display font-bold">Admin Panel</span>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button key={item.label} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${item.active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "hover:bg-sidebar-accent/50"}`}>
              <div className="flex items-center gap-3"><item.icon className="w-5 h-5" />{item.label}</div>
              {item.count && <span className="text-xs bg-sidebar-primary text-sidebar-primary-foreground px-2 py-0.5 rounded-full">{item.count}</span>}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-sidebar-border">
          <Link to="/"><Button variant="ghost" className="w-full justify-start text-sidebar-foreground"><LogOut className="w-4 h-4 mr-2" />Back to Site</Button></Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">Dashboard</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[{ label: "Total Projects", value: "12" }, { label: "Testimonials", value: "8" }, { label: "New Inquiries", value: "3" }, { label: "Media Files", value: "45" }].map((stat) => (
            <div key={stat.label} className="p-6 bg-card rounded-lg border border-border">
              <div className="text-muted-foreground text-sm mb-1">{stat.label}</div>
              <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
            </div>
          ))}
        </div>
        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="font-display text-xl font-semibold mb-4">Recent Inquiries</h2>
          <p className="text-muted-foreground">Connect Lovable Cloud to enable full admin functionality with database storage.</p>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
