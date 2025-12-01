import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  type TooltipContentProps,
} from "recharts";
import type { CurveType } from "recharts/types/shape/Curve";
import type { ChartData, Variation } from "../../types";
import bestIcon from "../../assets/images/best.svg";
import styles from "./Chart.module.css";

export type ChartType = CurveType | "area";

interface ChartProps {
  chartData: ChartData[];
  selectedChartType: ChartType;
  selectedInterval: string;
  selectedVariations: string;
  variations: Variation[];
}

interface AxisTick {
  x: number;
  y: number;
  payload: {
    coordinate: number;
    index: number;
    offset: number;
    value: string;
  };
}

const colors = [
  "#46464f",
  "#ff8346",
  "#4142ef",
  "#82ca9d",
  "#8884d8",
  "#b31111",
  "#ffff00",
  "#00e5ff",
];

function Chart({
  chartData,
  selectedChartType,
  selectedInterval,
  selectedVariations,
  variations,
}: ChartProps) {
  const formatDate = (date: string | number | undefined) => {
    const [year, month, day] = String(date).split("-");
    return `${day}/${month}/${year}`;
  };

  const CustomAxisTick = ({ x, y, payload }: AxisTick) => {
    return (
      <g transform={`translate(${x},${y})`} className={styles.custopmAxisTick}>
        <text
          x={0}
          y={0}
          dy={5}
          textAnchor="end"
          fill="#918f9a"
          transform="rotate(-90)"
        >
          {formatDate(payload.value)}
        </text>
      </g>
    );
  };

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipContentProps<string | number, string>) => {
    const isVisible = active && payload && payload.length;
    const newPayload = [...payload].sort((a, b) => b.value - a.value);
    console.log("payload", payload);

    return (
      <div
        className={styles.customTooltip}
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        {isVisible && (
          <>
            <div className={styles.tooltipName}>{formatDate(label)}</div>
            <div className={styles.divider} />
            <div className={styles.variationsList}>
              {newPayload.map((item, index) => (
                <div className={styles.variationItem} key={item.dataKey}>
                  <span
                    className={styles.variationColor}
                    style={{ background: `${item.color}` }}
                  ></span>
                  {item.name}
                  {index === 0 ? <img src={bestIcon} alt="" /> : null}
                  <span className={styles.variationValue}>{item.value}%</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <ResponsiveContainer width="100%" aspect={1.618} maxHeight={500}>
      {selectedChartType === "area" ? (
        <AreaChart
          responsive
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <defs>
            {variations.map((variation, index) => {
              const dataKey = variation.name.replaceAll(" ", "");

              return (
                <linearGradient
                  id={`color${dataKey}`}
                  key={index}
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={colors[index]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={colors[index]}
                    stopOpacity={0}
                  />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={selectedInterval === "Day" ? 0 : 6}
            height={100}
            tick={CustomAxisTick}
          />
          <YAxis width="auto" unit="%" />
          <Tooltip content={CustomTooltip} />
          {variations.map((variation, index) => {
            const dataKey = variation.name.replaceAll(" ", "");
            const isHidden = !(
              selectedVariations === "All" ||
              selectedVariations === variation.name
            );

            return (
              <Area
                connectNulls={true}
                dataKey={dataKey}
                fill={`url(#color${dataKey})`}
                fillOpacity={1}
                isAnimationActive={true}
                key={index}
                stroke={colors[index]}
                type="monotone"
                hide={isHidden}
                name={variation.name}
              />
            );
          })}
        </AreaChart>
      ) : (
        <LineChart
          responsive
          data={chartData}
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={selectedInterval === "Day" ? 0 : 6}
            height={100}
            tick={CustomAxisTick}
          />
          <YAxis width="auto" unit="%" />
          <Tooltip content={CustomTooltip} />
          {variations.map((variation, index) => {
            const dataKey = variation.name.replaceAll(" ", "");
            const isHidden = !(
              selectedVariations === "All" ||
              selectedVariations === variation.name
            );

            return (
              <Line
                connectNulls={true}
                dataKey={dataKey}
                dot={false}
                isAnimationActive={true}
                key={index}
                name={variation.name}
                stroke={colors[index]}
                strokeWidth={2}
                type={selectedChartType}
                unit="%"
                hide={isHidden}
              />
            );
          })}
        </LineChart>
      )}
    </ResponsiveContainer>
  );
}

export default Chart;
