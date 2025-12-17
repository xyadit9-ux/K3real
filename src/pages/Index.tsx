import { MadeWithDyad } from "@/components/made-with-dyad";
import { useMqttMonitoring } from "@/hooks/use-mqtt-monitoring";
import { DataCard } from "@/components/DataCard";
import { LevelChart } from "@/components/LevelChart";
import { Badge } from "@/components/ui/badge";
import { Droplet, AlertTriangle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { WaterLevelGauge } from "@/components/WaterLevelGauge";

const getBahayaClasses = (bahaya: string) => {
  switch (bahaya.toUpperCase()) {
    case "AMAN":
      return "bg-green-500 text-white hover:bg-green-600";
    case "WASPADA":
      return "bg-yellow-500 text-black hover:bg-yellow-600";
    case "BAHAYA":
      return "bg-red-600 text-white hover:bg-red-700";
    default:
      return "bg-gray-200 text-gray-800";
  }
};

const Index = () => {
  const { isConnected, riverData, history } = useMqttMonitoring();

  const bahayaClasses = getBahayaClasses(riverData.bahaya);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary dark:text-primary-foreground">
          MONITORING AIR SUNGAI
        </h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground hidden sm:inline">
            MQTT Status:
          </span>
          <Badge
            className={cn(
              "transition-colors duration-300",
              isConnected
                ? "bg-green-500 hover:bg-green-600"
                : "bg-red-500 hover:bg-red-600",
            )}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </header>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1: Level Air (Gauge) */}
        <WaterLevelGauge level={riverData.level} maxLevel={50} />

        {/* Card 2: Status Bahaya */}
        <DataCard
          title="Status Bahaya"
          icon={AlertTriangle}
          className={bahayaClasses}
          value={
            <span className="font-bold uppercase">
              {riverData.bahaya || "N/A"}
            </span>
          }
        />

        {/* Card 3: Status Alat */}
        <DataCard
          title="Status Alat"
          icon={Zap}
          className={
            riverData.status === "ONLINE"
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-400 text-white hover:bg-gray-500"
          }
          value={
            <span className="font-bold uppercase">
              {riverData.status || "N/A"}
            </span>
          }
        />
      </div>

      {/* Chart */}
      <div className="grid grid-cols-1">
        <LevelChart data={history} />
      </div>

      <MadeWithDyad />
    </div>
  );
};

export default Index;