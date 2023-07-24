"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

interface FreecounterProps {
  apiLimitCount: number;
}

const FreeCounter = ({ apiLimitCount }: FreecounterProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <div className="px-3">
    <Card className="bg-white/10 border-0">
      <CardContent className="py-6">
        <div className="text-center text-sm text-white mb-4 space-y-2">
          <p>{apiLimitCount} / {MAX_FREE_COUNTS} Free generations</p>
          <Progress value={(apiLimitCount/MAX_FREE_COUNTS) * 100} />
        </div>
        <Button variant={'premium'} className="w-full">
          Upgrade
          <Zap className="fill-white w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>

  </div>;
};
export default FreeCounter;
