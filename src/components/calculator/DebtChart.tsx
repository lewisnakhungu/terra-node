"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { useTerraNode } from "@/context/TerraNodeContext";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

export function DebtChart() {
  const { currentDebt, computeProfile } = useTerraNode();
  const rackCount = Math.ceil(computeProfile.gpuCount / 8);
  const directLand = rackCount * 12.5 * 2.3;
  const waterEquiv = currentDebt.arableLandDebt - directLand;

  const data = [
    { name: "Facility Land", value: Math.max(0, directLand) },
    { name: "Water Equivalent", value: Math.max(0, waterEquiv) },
  ].filter((d) => d.value > 0);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(v: number) => [`${Math.round(v).toLocaleString()} m²`, ""]}
            contentStyle={{ background: "#141a17", border: "1px solid #2a3530" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
