"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModal } from "@/hooks/pro-modal";

interface FreecounterProps {
  apiLimitCount: number,
  isPro : boolean
}

const FreeCounter = ({ apiLimitCount,isPro }: FreecounterProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const proModal = useProModal()
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  if(isPro){
    return null
  }
  return <div className="px-3">
    <Card className="bg-white/10 border-0">
      <CardContent className="py-6">
        <div className="text-center text-sm text-white mb-4 space-y-2">
          <p>{apiLimitCount} / {MAX_FREE_COUNTS} Free generations</p>
          <Progress value={(apiLimitCount/MAX_FREE_COUNTS) * 100} />
        </div>
        <Button onClick={proModal.onOpen} variant={'premium'} className="w-full">
          Upgrade
          <Zap className="fill-white w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>

  </div>;
};
export default FreeCounter;
