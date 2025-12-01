export interface Variation {
  id?: number;
  name: string;
}

export interface Metrics {
  variations: Variation[];
  data: [
    {
      date: string;
      visits: Record<string, number>;
      conversions: Record<string, number>;
    }
  ]
}

export type ChartData = {
  name: string;
} & Record<string, number | null>;
