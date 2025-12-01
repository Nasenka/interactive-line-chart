import type { Variation } from "../../types";
import type { ChartType } from "../Chart/Chart";
import styles from "./ControlPanel.module.css";

interface ControlPanelProps {
  selectedChartType: ChartType;
  selectedInterval: string;
  selectedVariations: string;
  variations: Variation[];
  onSelectChartType: (type: ChartType) => void;
  onSelectInterval: (interval: string) => void;
  onSelectVariation: (variation: string) => void;
}

function ControlPanel({
  selectedChartType,
  selectedInterval,
  selectedVariations,
  variations,
  onSelectChartType,
  onSelectInterval,
  onSelectVariation,
}: ControlPanelProps) {
  return (
    <div className={styles.controlPanel}>
      <div className={styles.left}>
        <select
          name="selectedVariation"
          value={selectedVariations}
          onChange={(e) => onSelectVariation(e.target.value)}
        >
          <option value="All">All variations selected</option>
          {variations.map((variation, index) => (
            <option value={variation.name} key={index}>
              {variation.name}
            </option>
          ))}
        </select>
        <select
          name="selectedInterval"
          value={selectedInterval}
          onChange={(e) => onSelectInterval(e.target.value)}
        >
          <option value="Day">Day</option>
          <option value="Week">Week</option>
        </select>
      </div>
      <div className={styles.right}>
        <select
          name="selectedChartType"
          value={selectedChartType as string}
          onChange={(e) => onSelectChartType(e.target.value as ChartType)}
        >
          <option value="monotone">Line style: smooth</option>
          <option value="linear">Line style: line</option>
          <option value="area">Line style: area</option>
        </select>
      </div>
    </div>
  );
}

export default ControlPanel;
