"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { metricConfig } from "@/lib/constants";
import type { Session } from "@/lib/types";

type MetricChartProps = {
  session: Session;
};

export function MetricChart({ session }: MetricChartProps) {
  return (
    <div className="mt-4 h-64 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={session.metrics} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke="#f5f5f5" vertical={false} />
          <XAxis
            dataKey="timestamp"
            tick={{ fill: "#737373", fontSize: 11 }}
            axisLine={{ stroke: "#e5e5e5" }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#737373", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e5e5",
              borderRadius: 0,
              color: "#171717",
              fontSize: "12px",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "12px", color: "#737373" }} />
          {metricConfig.map((metric) => (
            <Line
              key={metric.key}
              type="monotone"
              dataKey={metric.key}
              name={metric.label}
              stroke={metric.color}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 3 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
