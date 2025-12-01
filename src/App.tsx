import { useState } from "react";
import metrics from "./metrics.json";
import type { ChartData, Metrics, Variation } from "./types";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Chart, { type ChartType } from "./components/Chart/Chart";
import styles from "./App.module.css";

function App() {
  const variations: Variation[] = metrics.variations;
  const [selectedVariations, setSelectedVariations] = useState("All");
  const [selectedInterval, setSelectedInterval] = useState("Day");
  const [selectedChartType, setSelectedChartType] =
    useState<ChartType>("monotone");
  const mapVariations: Record<string, string> = {
    "0": "Original",
    "10001": "VariationA",
    "10002": "VariationB",
    "10003": "VariationC",
  };

  const chartData = (metrics as unknown as Metrics).data.map((entry) => {
    const result: ChartData = {
      name: entry.date,
      original: null,
      variationA: null,
      variationB: null,
      variationC: null,
    };

    Object.entries(entry.visits).forEach(([id, visits]) => {
      const conversions = entry.conversions[id] ?? 0;
      const percent =
        visits === 0 ? 0 : Math.round((conversions / visits) * 100 * 100) / 100;

      const variationName = mapVariations[id] as keyof Omit<ChartData, "name">;

      if (variationName) {
        result[variationName] = percent;
      }
    });

    return result;
  });

  const handleSelectedVariations = (variation: string) => {
    setSelectedVariations(variation);
    console.log("variation", variation);
  };

  const handleSelectedInterval = (interval: string) => {
    setSelectedInterval(interval);
    console.log("interval", interval);
  };

  const handleSelectedChartType = (type: ChartType) => {
    setSelectedChartType(type);
    console.log("type", type);
  };

  return (
    <main>
      <div className={styles.container}>
        <ControlPanel
          selectedChartType={selectedChartType}
          selectedInterval={selectedInterval}
          selectedVariations={selectedVariations}
          variations={variations}
          onSelectChartType={handleSelectedChartType}
          onSelectInterval={handleSelectedInterval}
          onSelectVariation={handleSelectedVariations}
        />
        <Chart
          chartData={chartData}
          selectedChartType={selectedChartType}
          selectedInterval={selectedInterval}
          selectedVariations={selectedVariations}
          variations={variations}
        />
      </div>
    </main>
  );
}

export default App;
