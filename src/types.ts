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

export interface ChartData {
  name: string;
  original: number | null;
  variationA: number | null;
  variationB: number | null;
  variationC: number | null;
}
