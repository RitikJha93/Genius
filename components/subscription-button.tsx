"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Loader, Zap } from "lucide-react";
import axios from "axios";

interface SubscriptionButtonProps {
  isPro: boolean;
}
const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleSubscription = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/api/stripe");
      window.location.href = data.url;
    } catch (error) {
      console.log("BILLING ERROR", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading ? (
        <Button variant={isPro ? "default" : "premium"}>
            <Loader className="animate-spin text-white" />
        </Button>
      ) : (
        <Button
          variant={isPro ? "default" : "premium"}
          onClick={handleSubscription}
        >
          {isPro ? "Manage Subscriptions" : "Upgrade"}
          {!isPro && <Zap className="fill-white w-4 h-4 ml-2" />}
        </Button>
      )}
    </>
  );
};

export default SubscriptionButton;
