import { Toaster } from "@/components/ui/toaster";
import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="flex gap-24 container item-self-center py-12 px-8">
        <div className="hidden md:block"><SideNav /></div>
        {children}
    </div>
    <Toaster />
    </>
  );
}
