import { getUserSession } from "@/lib/core/session";
import { Bell, House, Magnifier, FileText, CreditCard } from "@gravity-ui/icons";
import { Building, Users } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
  const user = await getUserSession();

  const creatorNavLinks = [
    { icon: House, href: "/dashboard/creator", label: "Home" },
    { icon: Magnifier, href: "/dashboard/creator/my-promts", label: "My Prompts" },
    { icon: Bell, href: "/dashboard/creator/promts/new", label: "Post A Prompt" },
  ];

  const userNavLinks = [
    { icon: House, href: "/dashboard/user", label: "Dashboard" },
    { icon: FileText, href: "/dashboard/user/my-reviews", label: "My Reviews" },
    { icon: CreditCard, href: "/dashboard/user/billings", label: "Billing" },
  ];

  const adminNavLinks = [
    { icon: House, href: "/dashboard/admin", label: "Dashboard" },
    { icon: Users, href: "/dashboard/admin/users", label: "All Users" },
    { icon: Building, href: "/dashboard/admin/promts", label: "All Prompts" },
    { icon: CreditCard, href: "/dashboard/admin/subscriptions", label: "All Payments" },
  ];

  const navLinksMap = {
    user: userNavLinks,
    creator: creatorNavLinks,
    admin: adminNavLinks,
  };

  const navItems = navLinksMap[user?.role || "user"];

  return (
    <aside className="w-64 h-screen shrink-0 border-r border-default p-4 bg-background sticky top-0 flex flex-col justify-start">
      <div className="mb-6 px-3">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Navigation
        </span>
      </div>
      
      <nav className="flex flex-col gap-1 w-full">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.label}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-default-100"
              href={item.href}
            >
              <IconComponent className="size-5 text-muted-foreground shrink-0" />
              <span className="capitalize">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}