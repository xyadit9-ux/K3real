import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

interface WaterLevelGaugeProps {
  level: number; // Current water level in cm
  maxLevel?: number; // Maximum level for percentage calculation (default 100)
}

export const WaterLevelGauge: React.FC<WaterLevelGaugeProps> = ({
  level,
  maxLevel = 100,
}) => {
  // Calculate fill percentage, capped at 100%
  const fillPercentage = Math.min((level / maxLevel) * 100, 100);

  return (
    <Card className="shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center p-4">
      <CardHeader className="p-0 pt-2 pb-4">
        <CardTitle className="text-lg font-semibold text-center">
          Ketinggian Air
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-0 w-full">
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-blue-500 overflow-hidden flex items-end justify-center">
          {/* Water Fill */}
          <div
            className={cn(
              "absolute bottom-0 left-0 w-full bg-blue-500 transition-all duration-1000 ease-out",
              // Apply a subtle wave effect at the top edge using a pseudo-element or border radius trick
              "before:content-[''] before:absolute before:top-[-10px] before:left-0 before:w-full before:h-[10px] before:bg-blue-500 before:rounded-t-[50%] before:opacity-100",
            )}
            style={{
              height: `${fillPercentage}%`,
            }}
          >
            {/* Level Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-foreground dark:text-white mix-blend-difference">
                {level.toFixed(1)}cm
              </span>
            </div>
          </div>
          
          {/* Ensure text is visible if water level is low */}
          {fillPercentage < 50 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl sm:text-4xl font-bold text-foreground">
                {level.toFixed(1)}cm
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};