export interface RiverData {
  level: number; // in cm
  bahaya: string; // e.g., 'AMAN', 'WASPADA', 'BAHAYA'
  status: string; // e.g., 'ONLINE', 'OFFLINE'
}

export interface ChartDataPoint {
  time: string;
  level: number;
}