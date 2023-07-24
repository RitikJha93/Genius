import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  
  const apiLimitCount = await getApiLimitCount()
  return (
    <div className="h-full relative">
      <div className="h-full md:flex hidden md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80]">
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};
export default DashboardLayout;
