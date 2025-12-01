import { useState } from "react";
import metrics from "./metrics.json";
import type { ChartData, Metrics } from "./types";
import ControlPanel from "./components/ControlPanel/ControlPanel";
import Chart, { type ChartType } from "./components/Chart/Chart";
import styles from "./App.module.css";

const { data, variations } = metrics as unknown as Metrics;

function App() {
  const [selectedVariation, setSelectedVariation] = useState("All");
  const [selectedInterval, setSelectedInterval] = useState("Day");
  const [selectedChartType, setSelectedChartType] =
    useState<ChartType>("monotone");
  const mapVariations: Record<string, string> = variations.reduce<
    Record<string, string>
  >((result, variation) => {
    const name = variation.name.replace(" ", "");

    if (variation.id) {
      result[variation.id] = name;
    } else {
      result[0] = name;
    }

    return result;
  }, {});

  const chartData = data.map((entry) => {
    const result = {
      name: entry.date,
      ...variations.reduce<Record<string, null>>((result, { name }) => {
        result[name.replace(" ", "")] = null;
        
        return result;
      }, {}),
    } as ChartData;

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

  const handleSelectedVariation = (variation: string) => {
    setSelectedVariation(variation);
  };

  const handleSelectedInterval = (interval: string) => {
    setSelectedInterval(interval);
  };

  const handleSelectedChartType = (type: ChartType) => {
    setSelectedChartType(type);
  };

  return (
    <main>
      <div className={styles.container}>
        <ControlPanel
          selectedChartType={selectedChartType}
          selectedInterval={selectedInterval}
          selectedVariation={selectedVariation}
          variations={variations}
          onSelectChartType={handleSelectedChartType}
          onSelectInterval={handleSelectedInterval}
          onSelectVariation={handleSelectedVariation}
        />
        <Chart
          chartData={chartData}
          selectedChartType={selectedChartType}
          selectedInterval={selectedInterval}
          selectedVariation={selectedVariation}
          variations={variations}
        />
      </div>
    </main>
  );
}

export default App;
