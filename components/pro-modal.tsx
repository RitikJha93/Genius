"use client";

import { useProModal } from "@/hooks/pro-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Check, Code, ImageIcon, Loader2Icon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { NextResponse } from "next/server";
import axios from "axios";
import Loader from "./Loader";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "text-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "text-pink-700/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgColor: "text-orange-700/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "text-emerald-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "text-green-700/10",
  },
];
const ProModal = () => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubscribe = async() => {
    try {
        setLoading(true)

        const {data} = await axios.get('/api/stripe')

        window.location.href = data.url
    } catch (error:any) {
        console.log(error,'STRIPE_CLIENT_ERROR')
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])
  
  if(!mounted){
    return null
  }
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to Genius
              <Badge
                variant={"premium"}
                className="uppercase text-sm py-1 text-white"
              >
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {
              tools.map((tool,i)=>(
                <Card key={i} className="border-black/5 flex items-center justify-between p-3">
                    <div className="flex items-center gap-x-4">
                      <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                          <tool.icon className={cn("w-6 h-6",tool.color)} />
                      </div>
                      <div className="text-sm font-semibold">
                        {tool.label}
                      </div>
                    </div>
                    <Check className="text-primary w-5 h-5" />
                </Card>
              ))
            }
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {
            loading ? <Button className="w-full" size={'lg'} variant={'premium'}><Loader2Icon className="animate-spin w-6 h-6 text-center" /></Button> : <Button onClick={onSubscribe} className="w-full" size={'lg'} variant={'premium'}>
            Upgrade
            <Zap className="fill-white w-4 h-4 ml-2" />
          </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ProModal;
