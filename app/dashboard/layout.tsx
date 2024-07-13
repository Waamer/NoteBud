import { Toaster } from "@/components/ui/toaster";
import SideNav from "./side-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex gap-24 container item-self-center px-6 py-10 min-[400px]:px-8 min-[400px]:py-12">
        <div className="hidden md:block"><SideNav /></div>
        {children}
      </div>
      <Toaster />
    </>
  );
}
