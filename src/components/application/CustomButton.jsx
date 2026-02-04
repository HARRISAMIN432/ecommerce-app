import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export const CustomButton = ({
  type,
  text,
  loading,
  className,
  onClick,
  ...props
}) => {
  return (
    <Button
      type={type}
      disabled={loading}
      onClick={onClick}
      className={cn("", className)}
      {...props}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {text}
    </Button>
  );
};
