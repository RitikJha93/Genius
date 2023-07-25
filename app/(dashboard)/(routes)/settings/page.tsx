import Heading from "@/components/heading";
import SubscriptionButton from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { Settings } from "lucide-react";

const settingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div>
      <Heading
        title="Settings"
        description="Manage Account settings"
        icon={Settings}
        bgColor="bg-gray-700/10"
        iconColor="text-gray-700"
      />
      <div className="px-4 lg:px-8  space-y-4">
            <div className="text-muted-foreground text-sm">
                {isPro ? "You are currently on a Pro Plan" : "You are currently on a Free Plan"}
            </div>
            <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
};

export default settingsPage;
