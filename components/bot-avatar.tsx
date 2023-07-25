import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import logo from "../public/logo.png";

const BotAvatar = () => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage className="p-1" src='./logo.png' alt="@shadcn" />
    </Avatar>
  );
};
export default BotAvatar;
