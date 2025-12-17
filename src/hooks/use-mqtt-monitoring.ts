import React, { useState, useEffect, useCallback } from "react";
import mqtt from "mqtt";
import { RiverData, ChartDataPoint } from "@/types/monitoring";

// Configuration
const BROKER_URL = "ws://broker.hivemq.com:8000/mqtt";
const TOPIC = "unik123/monitoring/sungai/dyad_all";
const MAX_HISTORY_POINTS = 30;

interface MqttState {
  isConnected: boolean;
  riverData: RiverData;
  history: ChartDataPoint[];
}

const initialRiverData: RiverData = {
  level: 0,
  bahaya: "UNKNOWN",
  status: "OFFLINE",
};

export function useMqttMonitoring() {
  const [state, setState] = useState<MqttState>({
    isConnected: false,
    riverData: initialRiverData,
    history: [],
  });

  const updateRiverData = useCallback((data: RiverData) => {
    setState((prevState) => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newHistory = [
        ...prevState.history,
        { time: timeString, level: data.level },
      ].slice(-MAX_HISTORY_POINTS);

      return {
        ...prevState,
        riverData: data,
        history: newHistory,
      };
    });
  }, []);

  useEffect(() => {
    const client = mqtt.connect(BROKER_URL);

    client.on("connect", () => {
      console.log("MQTT Connected");
      setState((prevState) => ({ ...prevState, isConnected: true }));
      client.subscribe(TOPIC, (err) => {
        if (err) {
          console.error("Subscription error:", err);
        }
      });
    });

    client.on("message", (topic, message) => {
      if (topic === TOPIC) {
        try {
          const data: RiverData = JSON.parse(message.toString());
          updateRiverData(data);
        } catch (e) {
          console.error("Failed to parse MQTT message:", e);
        }
      }
    });

    client.on("error", (err) => {
      console.error("MQTT Error:", err);
      setState((prevState) => ({ ...prevState, isConnected: false }));
    });

    client.on("close", () => {
      console.log("MQTT Disconnected");
      setState((prevState) => ({
        ...prevState,
        isConnected: false,
        riverData: { ...prevState.riverData, status: "OFFLINE" },
      }));
    });

    return () => {
      if (client) {
        client.end();
      }
    };
  }, [updateRiverData]);

  return state;
}