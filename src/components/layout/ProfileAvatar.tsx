import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-lg",
};

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join("");
}

export function ProfileAvatar({ name, size = "md", className }: Props) {
  return (
    <Avatar className={cn(sizeMap[size], className)}>
      <AvatarFallback className="bg-secondary text-foreground font-medium select-none">
        {getInitials(name || "?")}
      </AvatarFallback>
    </Avatar>
  );
}
