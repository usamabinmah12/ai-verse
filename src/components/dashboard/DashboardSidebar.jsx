import { getUserSession } from "@/lib/core/session";
import { LayoutSideContentLeft, Bell, Briefcase, Envelope, Gear, House, Magnifier, Person, Bookmark, FileText, CreditCard } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import { Building, Users, Menu } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {
    const user = await getUserSession();

    // Creator navigation array updated with prompt marketplace scope
    const creatorNavLinks = [
        { icon: House, href: "/dashboard/creator", label: "Home" },
        { icon: Magnifier, href: "/dashboard/creator/my-promts", label: "my Prompts" },
        { icon: Bell, href: "/dashboard/creator/promts/new", label: "Post A Prompt" },
        
    ];

    // User navigation links
    const userNavLinks = [
        { icon: House, href: "/dashboard/user", label: "Dashboard" },
       
        // { icon: Bookmark, href: "/dashboard/user/saved-prompts", label: "Saved Prompts" },
        { icon: FileText, href: "/dashboard/user/my-reviews", label: "My Reviews" },
        { icon: CreditCard, href: "/dashboard/user/billings", label: "Billing" },
        
    ];

    // Admin control management paths
    const adminNavLinks = [
        { icon: House, href: "/dashboard/admin", label: "Dashboard" },
        { icon: Users, href: "/dashboard/admin/users", label: "All Users" },
        { icon: Building, href: "/dashboard/admin/promts", label: "All Prompts" },
        
        { icon: CreditCard, href: "/dashboard/admin/subscriptions", label: "All Payments" },
       
    ];

    const navLinksMap = {
        user: userNavLinks,
        creator: creatorNavLinks,
        admin: adminNavLinks
    };

    const navItems = navLinksMap[user?.role || 'user'];

    // Common navigation block
    const navContent = (
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
                        <span>{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );

    return (
        <>
            {/* 1. Mobile Top Bar / Header Trigger (ডেস্কটপে অর্থাৎ lg স্ক্রিনে এই পুরো অংশটি একদম গায়েব থাকবে) */}
            {/* <div className="block lg:hidden w-full bg-background border-b border-default sticky top-0 z-40">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-lg capitalize">{(user?.role || 'User')} Dashboard</span>
                    </div>
                    
                    <div>
                        <Drawer>
                            <Button isIconOnly variant="light">
                                <Menu className="size-6" />
                            </Button>
                            <Drawer.Backdrop />
                            <Drawer.Content placement="left" className="max-w-[280px]">
                                <Drawer.Header className="flex flex-col gap-1 border-b border-default px-6 py-4">
                                    <span className="font-bold text-xl">Navigation</span>
                                </Drawer.Header>
                                <Drawer.Body className="px-4 py-4">
                                    {navContent}
                                </Drawer.Body>
                            </Drawer.Content>
                        </Drawer>
                    </div>
                </div>
            </div> */}

            {/* 2. Desktop Sidebar Layout (শুধুমাত্র লার্জ স্ক্রিনে দেখাবে, মোবাইলে হাইড থাকবে) */}
            <aside className="hidden lg:flex flex-col w-64 h-screen shrink-0 border-r border-default p-4 bg-background sticky top-0">
                <div className="mb-6 px-3">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Navigation
                    </span>
                </div>
                {navContent}
            </aside>
        </>
    );
}