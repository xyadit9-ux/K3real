import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface DataCardProps {
  title: string;
  value: React.ReactNode;
  icon: LucideIcon;
  className?: string;
}

export const DataCard: React.FC<DataCardProps> = ({
  title,
  value,
  icon: Icon,
  className,
}) => {
  return (
    <Card className={cn("shadow-lg transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};