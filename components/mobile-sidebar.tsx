'use client';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";
import { getApiLimitCount } from "@/lib/api-limit";

const MobileSidebar = () => {

  const [isMounted, setIsMounted] = useState(false)
  let apiLimitCount = 0;
  // const apiLimit = async () => {
  //     apiLimitCount = await getApiLimitCount()
  // }
  useEffect(() => {
    setIsMounted(true)
    // apiLimit()
  }, [])
  
  if(!isMounted) {
    return null
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <Sidebar apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};
export default MobileSidebar;
