import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {

  
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()
  return (
    <div className="h-full relative">
      <div className="h-full md:flex hidden md:w-72 md:flex-col md:fixed md:inset-y-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
};
export default DashboardLayout;
