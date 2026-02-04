"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";
import { useMemo } from "react";

interface TrendsSectionProps {
  invoices: any[];
  clients: any[];
}

export function TrendsSection({ invoices, clients }: TrendsSectionProps) {
  // Process data for the last 6 months
  const chartData = useMemo(() => {
    const months: {
      date: Date;
      name: string;
      fullName: string;
      revenue: number;
      newClients: number;
    }[] = [];
    const now = new Date();

    // Generate last 6 months keys
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        date: d,
        name: d.toLocaleString("default", { month: "short" }),
        fullName: d.toLocaleString("default", {
          month: "long",
          year: "numeric",
        }),
        revenue: 0,
        newClients: 0,
      });
    }

    // Calculate Invoicing Trend (Revenue)
    invoices.forEach((inv) => {
      if (!inv.createdAt) return;
      const d = new Date(inv.createdAt);
      if (isNaN(d.getTime())) return;

      const monthIndex = months.findIndex(
        (m) =>
          m.date.getMonth() === d.getMonth() &&
          m.date.getFullYear() === d.getFullYear(),
      );

      if (monthIndex !== -1) {
        months[monthIndex].revenue += Number(inv.amount || 0);
      }
    });

    // Calculate Client Trend (New Clients)
    clients.forEach((client) => {
      // Assuming clients have createdAt, if not fallback to now or ignore
      if (!client.createdAt) return;
      const d = new Date(client.createdAt);
      if (isNaN(d.getTime())) return;

      const monthIndex = months.findIndex(
        (m) =>
          m.date.getMonth() === d.getMonth() &&
          m.date.getFullYear() === d.getFullYear(),
      );

      if (monthIndex !== -1) {
        months[monthIndex].newClients += 1;
      }
    });

    return months;
  }, [invoices, clients]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
      {/* Invoicing Trend Chart */}
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-2xl font-black tracking-tighter">
            INVOICING TREND
          </CardTitle>
          <CardDescription>
            Revenue generated over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.3}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    `₹${value >= 1000 ? (value / 1000).toFixed(0) + "k" : value}`
                  }
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                  }}
                  formatter={(value: number) => [
                    `₹${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                  labelFormatter={(label) =>
                    chartData.find((i) => i.name === label)?.fullName || label
                  }
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Client Trend Chart */}
      <Card className="border-2 border-black">
        <CardHeader>
          <CardTitle className="text-2xl font-black tracking-tighter">
            CLIENT TREND
          </CardTitle>
          <CardDescription>
            New clients acquired over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.3}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  allowDecimals={false}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "2px solid #000",
                    boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)",
                  }}
                  formatter={(value: number) => [value, "New Clients"]}
                  labelFormatter={(label) =>
                    chartData.find((i) => i.name === label)?.fullName || label
                  }
                />
                <Bar
                  dataKey="newClients"
                  fill="#FA731B"
                  radius={[4, 4, 0, 0]}
                  barSize={40}
                  animationDuration={2000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
